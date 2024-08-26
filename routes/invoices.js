const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const Customer = require('../models/customer');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/:licenseID', authenticateToken, async (req, res) => {
  const licenseID = req.params.licenseID;

  try {
    const customer = await Customer.findOne({ where: { LicenseID: licenseID } });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const invoices = await Invoice.findAll({ where: { CustomerID: customer.CustomerID } });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:invoiceID/print', authenticateToken, async (req, res) => {
  const invoiceID = req.params.invoiceID;

  try {
    const invoice = await Invoice.findByPk(invoiceID);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    invoice.printed = true;
    await invoice.save();

    const allInvoices = await Invoice.findAll();

    res.status(200).json(allInvoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
