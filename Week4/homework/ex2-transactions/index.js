const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const { importData } = require('./setup.js');
const { transferMoney } = require('./transfer.js');

const client = new MongoClient(process.env.MONGODB_URL);

async function main() {
  try {
    await client.connect();
    console.log('Connected');
    await importData(client);
    await transferMoney(101, 102, 550, 'expenses');
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
