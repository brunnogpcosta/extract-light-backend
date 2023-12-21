const pdfService = require('../services/invoicesService.js');
const pdfParser = require('../utils/pdfParser.js');

async function processPDF(req, res) {
  try {
    const extractedData = await pdfParser.extractDataFromPDF();
    const invoicesSaved = await pdfService.persistData(extractedData)

    res.json({ success: true, data: invoicesSaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro no processamento do PDF.' });
  }
}


async function getInvoices(req, res) {
  try {
    const invoicesData = await pdfService.getAllInvoices(req.query.clientNumber);

    res.json({ success: true, data: invoicesData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro no processamento do PDF.' });
  }
}


module.exports = { processPDF, getInvoices };
