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

    connection.query(
      `INSERT INTO account (account_number,balance) VALUES 
    (101,2000),
    (102,3000),
    (103,4000);`,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      },
    );

    connection.query(
      `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES 
    (101, 500.00, NOW(), "First"),
        (102, 1000.00, NOW(), "Second"),
        (103, 1500.00, NOW(), "Third");`,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      },
    );
  }
});