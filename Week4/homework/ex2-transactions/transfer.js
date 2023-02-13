const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);


async function transferMoney(
  senderAccount,
  receiverAccount,
  amount,
  remark,
) {
  const accountsCollection = await client.db('databaseWeek4').collection('account');
  const session = client.startSession();

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
  };


  try {

    const transactionResult = await session.withTransaction(async () => {
      const { account_changes: senderChanges } = await accountsCollection.findOne({ account_number: senderAccount })
      const accountUpdateSender = await accountsCollection.updateOne(
        { account_number: senderAccount },
        {
          $inc: { balance: -amount },
          $push: {
            account_changes: {
              change_number: senderChanges.length + 1,
              amount: -amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },
        { session },
      );


      console.log(
        `${accountUpdateSender.matchedCount} document found in the accounts collection with the account number ${senderAccount}`,
      );
      const { account_changes: receiverChanges } = await accountsCollection.findOne({ account_number: receiverAccount })
      const accountUpdateReceiver = await accountsCollection.updateOne(
        { account_number: receiverAccount },
        {
          $inc: { balance: +amount },
          $push: {
            account_changes: {
              change_number: receiverChanges.length + 1,
              amount: amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },
        { session },
      );
      console.log(
        `${accountUpdateReceiver.matchedCount} document found in the accounts collection with the account number ${receiverAccount}`,
      );
    }, transactionOptions);

    if (transactionResult) {
      console.log('the transaction was successfully done');
    } else {
      await session.abortTransaction();
      console.log('the transaction was intentionally aborted');
    }
  } catch (error) {
    console.log(
      'the transaction was aborted due to an unexpected error:' + error,
    );
  } finally {
    await session.endSession();
  }
}

module.exports = {
  transferMoney,
};
