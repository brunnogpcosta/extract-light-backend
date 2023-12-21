const express = require('express');
const pdfController = require('./src/controllers/pdfController.js');


const app = express();
const port = 3001;

app.use(express.json());

app.post('/extract-invoice', pdfController.processPDF);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
