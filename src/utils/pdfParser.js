const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");

async function extractDataFromPDF() {
  const filenames = fs.readdirSync("invoices");

  let documentsData = [];

  await Promise.all(filenames.map(async (fn) => {
    const filePath = path.resolve(`invoices/${fn}`);
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    const data = pdfData.text;

    let payloadEnergy = {
      clientNumber: "",
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

    // Eletric Energy
    const regexEletricEnergy = /Energia Elétrica.*?(\d+)\s+(\d+,\d+)/;
    const matchEletricEnergy = data.match(regexEletricEnergy);

    if (matchEletricEnergy) {
      payloadEnergy.eletricEnergy.qty = Number(matchEletricEnergy[1]);
      payloadEnergy.eletricEnergy.amount = Number(matchEletricEnergy[2].replace(
        ",",
        ".",
      ));
    }

    //  ICMS Energy
    const regexSCEEEnergy = /Energia SCEE s\/ ICMSkWh\s+(\d+)\s+([\d\.,-]+)/;
    const matchSCEEEnergy = data.match(regexSCEEEnergy);

    if (matchSCEEEnergy) {
      payloadEnergy.eletricEnergyWithoutICMS.qty = Number(matchSCEEEnergy[1]);
      payloadEnergy.eletricEnergyWithoutICMS.amount =
      Number(matchSCEEEnergy[2].replace(",", "."));
    }

    // CompensedEnergy
    const regexCompensedEnergyGD =
      /Energia compensada GD IkWh\s+(\d+)\s+([-\d\.,]+)/;
    const matchCompensedEnergyGD = data.match(regexCompensedEnergyGD);

    if (matchCompensedEnergyGD) {
      payloadEnergy.compensedEletricEnergy.qty = Number(matchCompensedEnergyGD[1]);
      payloadEnergy.compensedEletricEnergy.amount =
      Number(matchCompensedEnergyGD[2].replace(",", "."));
    }

    // Contribute
    const regexContribIlumPublic =
      /Contrib Ilum Publica Municipal\s+([\d\.,-]+)/;
    const matchContribIlumPublic = data.match(regexContribIlumPublic);

    if (matchContribIlumPublic) {
      payloadEnergy.publicContribute = Number( matchContribIlumPublic[1].replace(
        ",",
        ".",
      ));
    }

    // Period
    const regexPeriod = /\b(\w{3}\/\d{2,4})\b/;
    const matchPeriod = data.match(regexPeriod);

    if (matchPeriod) {
      payloadEnergy.period = matchPeriod[1];
    }

    // clientNumber
    const regexClientNumber = /\b(\d{10})\b/;
    const matchClientNumber = data.match(regexClientNumber);

    if (matchClientNumber) {
      payloadEnergy.clientNumber = matchClientNumber[1];
    }

     documentsData.push(payloadEnergy);
  }));

  return documentsData;
}

module.exports = { extractDataFromPDF };
