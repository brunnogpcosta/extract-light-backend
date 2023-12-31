const prisma = require('../models/prismaClient.js');

async function persistData(invoices) {
  const result = [];

  for (const data of invoices) {
    // verify if exists before save database
    const existingInvoice = await prisma.invoices.findFirst({
      where: {
        clientNumber: data.clientNumber,
        period: data.period,
      },
    });

    if (!existingInvoice) {
      const newInvoice = await prisma.invoices.create({
        data: {
          fileName: data.fileName,
          clientNumber: data.clientNumber,
          period: data.period,
          invoiceDate: data.invoiceDate,
          eletricEnergyQty: data.eletricEnergy.qty,
          eletricEnergyAmount: data.eletricEnergy.amount,
          eletricEnergyWithoutICMSQty: data.eletricEnergyWithoutICMS.qty,
          eletricEnergyWithoutICMSAmount: data.eletricEnergyWithoutICMS.amount,
          compensedEletricEnergyQty: data.compensedEletricEnergy.qty,
          compensedEletricEnergyAmount: data.compensedEletricEnergy.amount,
          publicContribute: data.publicContribute,
          
        },
      });

      result.push(newInvoice);
    } else {
      console.log(`Registro já existe para ${data.clientNumber} - ${data.period}`);
    }
  }

  return result;
}

async function getAllInvoices(clientNumberFilter, orderByField = 'invoiceDate', sortOrder = 'asc') {
  let query = {};

  if (clientNumberFilter) {
    query = {
      where: {
        clientNumber: clientNumberFilter,
      },
      orderBy: {
        [orderByField]: sortOrder,
      },
    };
  } else {
    query = {
      orderBy: {
        [orderByField]: sortOrder,
      },
    };
  }

  const invoices = await prisma.invoices.findMany(query);
  return invoices;
}


module.exports = { persistData, getAllInvoices };
