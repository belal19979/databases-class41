const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'db_week3',
});

connection.connect((err) => {
  if (err) {
    console.log('Error occurred', err);
  } else {
    console.log('Connected to MySQL Server');
    try {
      connection.query(`START TRANSACTION`);
      connection.query(
        `UPDATE account SET balance = balance-1000 WHERE account_number =101 `,
      );
      connection.query(
        `UPDATE account SET balance = balance+1000 WHERE account_number =102 `,
      );
      connection.query(
        `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, -1000, NOW(), 'send')`,
      );
      connection.query(
        `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (102, 1000, NOW(), 'received')`,
      );
      connection.query(`COMMIT`);
      console.log('Transaction successfully completed!');
    } catch (error) {
      connection.query(`ROLLBACK`);
    }
  }
});
