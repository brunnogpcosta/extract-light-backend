require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const express = require('express');
const cors = require('cors'); 
const pdfController = require('./src/controllers/invoicesController.js');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Dowload pdf
app.get('/download/:fileName', pdfController.downloadInvoice);

// save invoice ind DB
app.post('/extract-invoice', pdfController.processPDF);

// get faturas
app.get('/invoices', pdfController.getInvoices);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
