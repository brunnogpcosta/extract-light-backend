const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");
const { parse, format } = require('date-fns');
const { ptBR } = require('date-fns/locale');

function parseMonthYearString(monthYearString) {
  const year = monthYearString.slice(-2);
  const fullYear = `20${year}`;
  const dateString = `01 ${monthYearString.replace(year, fullYear)}`;
  const parsedDate = parse(dateString, 'dd MMM/yyyy', new Date(), { locale: ptBR });

  return parsedDate;
}


async function extractDataFromPDF() {
  const filenames = fs.readdirSync("invoices");

  let documentsData = [];

  await Promise.all(
    filenames.map(async (fn) => {
      const filePath = path.resolve(`invoices/${fn}`);
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdf(dataBuffer);
      const data = pdfData.text;

      let payloadEnergy = {
        fileName: "",
        clientNumber: "",
        invoiceDate: "",
        period: "",
        eletricEnergy: {
          qty: 0,
          amount: 0,
        },
        eletricEnergyWithoutICMS: {
          qty: 0,
          amount: 0,
        },
        compensedEletricEnergy: {
          qty: 0,
          amount: 0,
        },
        publicContribute: 0,
      };

      // File Name
      payloadEnergy.fileName = fn;



      // Eletric Energy
      const regexEletricEnergy = /Energia Elétrica.*?(\d+)\s+(\d+,\d+)/;
      const matchEletricEnergy = data.match(regexEletricEnergy);

      if (matchEletricEnergy) {
        payloadEnergy.eletricEnergy.qty = Number(matchEletricEnergy[1]);
        payloadEnergy.eletricEnergy.amount = Number(
          matchEletricEnergy[2].replace(",", "."),
        );
      }

      //  ICMS Energy
      const regexSCEEEnergy = /Energia SCEE s\/ ICMSkWh\s+(\d+)\s+([\d\.,-]+)/;
      const matchSCEEEnergy = data.match(regexSCEEEnergy);

      if (matchSCEEEnergy) {
        payloadEnergy.eletricEnergyWithoutICMS.qty = Number(matchSCEEEnergy[1]);
        payloadEnergy.eletricEnergyWithoutICMS.amount = Number(
          matchSCEEEnergy[2].replace(",", "."),
        );
      }

      // CompensedEnergy
      const regexCompensedEnergyGD =
        /Energia compensada GD IkWh\s+(\d+)\s+([-\d\.,]+)/;
      const matchCompensedEnergyGD = data.match(regexCompensedEnergyGD);

      if (matchCompensedEnergyGD) {
        payloadEnergy.compensedEletricEnergy.qty = Number(
          matchCompensedEnergyGD[1],
        );
        payloadEnergy.compensedEletricEnergy.amount = Number(
          matchCompensedEnergyGD[2].replace(",", "."),
        );
      }

      // Contribute
      const regexContribIlumPublic =
        /Contrib Ilum Publica Municipal\s+([\d\.,-]+)/;
      const matchContribIlumPublic = data.match(regexContribIlumPublic);

      if (matchContribIlumPublic) {
        payloadEnergy.publicContribute = Number(
          matchContribIlumPublic[1].replace(",", "."),
        );
      }

      // Period
      const regexPeriod = /\b(\w{3}\/\d{2,4})\b/;
      const matchPeriod = data.match(regexPeriod);

      if (matchPeriod) {
        payloadEnergy.period = matchPeriod[1];

        // Invoice date
        payloadEnergy.invoiceDate = parseMonthYearString(matchPeriod[1])
      }

      // clientNumber
      const regexClientNumber = /\b(\d{10})\b/;
      const matchClientNumber = data.match(regexClientNumber);

      if (matchClientNumber) {
        payloadEnergy.clientNumber = matchClientNumber[1];
      }

      documentsData.push(payloadEnergy);
    }),
  );

  return documentsData;
}

async function downloadPDF(fileName, res) {
  const filePath = path.resolve(`invoices/${fileName}`);

  if (fs.existsSync(filePath)) {
    // to force download
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "application/octet-stream");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ success: false, error: "Arquivo não encontrado." });
  }
}

module.exports = { extractDataFromPDF, downloadPDF };
