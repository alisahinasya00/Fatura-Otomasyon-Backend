const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./customer');

const Invoice = sequelize.define('Invoice', {
  InvoiceID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CustomerID: {
    type: DataTypes.INTEGER,
    references: {
      model: Customer,
      key: 'CustomerID'
    },
    allowNull: false
  },
  InvoicePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  printed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: false
});

Customer.hasMany(Invoice, { foreignKey: 'CustomerID' });
Invoice.belongsTo(Customer, { foreignKey: 'CustomerID' });

module.exports = Invoice;
