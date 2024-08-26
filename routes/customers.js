const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/:licenseID', async (req, res) => {
  const licenseID = req.params.licenseID;

  try {
    const customer = await Customer.findOne({ where: { LicenseID: licenseID } });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const user = await Customer.findAll({ where: { CustomerID: customer.CustomerID } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/printer/:licenseID', async (req, res) => {
  const { licenseID } = req.params;
  const { printerName } = req.body;

  try {
    // Müşteri kaydını LicenseID ile bul
    const customer = await Customer.findOne({ where: { LicenseID: licenseID } });

    if (!customer) {
      return res.status(404).json({ message: 'Müşteri bulunamadı' });
    }

    // Yazıcı adı ekle veya güncelle
    customer.PrinterName = printerName;
    await customer.save();

    res.status(200).json({ message: 'Yazıcı adı başarıyla güncellendi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/printer/:licenseID', async (req, res) => {
  const { licenseID } = req.params;

  try {
    const customer = await Customer.findOne({ where: { LicenseID: licenseID } });

    if (!customer) {
      return res.status(404).json({ message: 'Müşteri bulunamadı' });
    }

    // Mevcut yazıcı adını döndür
    res.status(200).json({ PrinterName: customer.PrinterName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;