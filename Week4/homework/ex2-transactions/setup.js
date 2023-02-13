const db = 'databaseWeek4';
const collection = 'account';

const importData = async (client) => {
  try {
    await client.connect();
    await client.db(db).collection(collection).deleteMany();
    await client.db(db).collection(collection).insertMany(accounts);
    console.log('Accounts data imported successfully');
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const accounts = [
  {
    account_number: 101,
    balance: 5000,
    account_changes: [
      {
        change_number: 1,
        amount: 1000,
        changed_date: '2010-10-10',
        remark: 'expenses',
      },
      {
        change_number: 2,
        amount: 500,
        changed_date: '2010-10-09',
        remark: 'expenses',
      },
    ],
  },
  {
    account_number: 102,
    balance: 6000,
    account_changes: [
      {
        change_number: 1,
        amount: 1500,
        changed_date: '2011-11-11',
        remark: 'expenses',
      }, {
        change_number: 2,
        amount: 500,
        changed_date: '2010-10-09',
        remark: 'expenses',
      },
    ],
  },
  {
    account_number: 103,
    balance: 7000,
    account_changes: [
      {
        change_number: 1,
        amount: 500,
        changed_date: '2012-12-12',
        remark: 'expenses',
      },
      {
        change_number: 2,
        amount: 1000,
        changed_date: '2012-12-13',
        remark: 'expenses',
      },
    ],
  },
];

module.exports = { importData };
