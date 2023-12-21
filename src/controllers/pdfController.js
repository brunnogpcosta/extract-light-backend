const pdfService = require('../services/pdfService.js');
const pdfController = require('../utils/pdfParser.js');

async function processPDF(req, res) {
  try {
    const extractedData = await pdfController.extractDataFromPDF();
    const invoicedsSaved = await pdfService.persistData(extractedData)

    res.json({ success: true, data: invoicedsSaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro no processamento do PDF.' });
  }
}

module.exports = { processPDF };
