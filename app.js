const express = require('express');
const sequelize = require('./config/database');
const Customer = require('./models/customer');
const Invoice = require('./models/invoice');
const invoiceRoutes = require('./routes/invoices');
const authRoutes = require('./routes/auth');
const customerRouters = require('./routes/customers');

const app = express();
app.use(express.json());
app.use('/api/invoices', invoiceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/login', customerRouters);

sequelize.sync()
  .then(() => {
    console.log('Veritabani olusturuldu');
  })
  .catch(err => {
    console.error('Veritabani hatasi:', err);
  }
  );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} calisiyor.`);
});


