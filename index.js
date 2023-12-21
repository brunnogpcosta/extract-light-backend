const express = require('express');
const pdfController = require('./src/controllers/invoicesController.js');


const app = express();
const port = 3001;

app.use(express.json());

// to save invoices in database
app.post('/extract-invoice', pdfController.processPDF);

app.get('/invoices', pdfController.getInvoices);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
