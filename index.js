const express = require('express');
const cors = require('cors'); 
const pdfController = require('./src/controllers/invoicesController.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Dowload pdf
app.get('/download/:fileName', pdfController.downloadInvoice);

// Salvar faturas no banco de dados
app.post('/extract-invoice', pdfController.processPDF);

// Obter faturas
app.get('/invoices', pdfController.getInvoices);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
