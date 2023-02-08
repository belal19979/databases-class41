const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect((err) => {
  if (err) {
    console.log('Error occurred', err);
  } else {
    console.log('Connected to MySQL Server');
    connection.query(`DROP DATABASE IF EXISTS db_week3`, (err, result) => {
      if (err) throw err;
      console.log(' database deleted');
    });
    const query = `CREATE DATABASE db_week3`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log('New database created');
    });
    connection.query(`USE db_week3`, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    connection.query(
      `CREATE TABLE IF NOT EXISTS account(
      account_number INT PRIMARY KEY AUTO_INCREMENT,
      balance INT
  ); `,
      (err, result) => {
        if (err) throw err;
        console.log('account table created');
      },
    );
    connection.query(
      `CREATE TABLE IF NOT EXISTS account_changes(
      change_number INT PRIMARY KEY AUTO_INCREMENT,
      account_number INT,
      amount INT,
      changed_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      remark TEXT,
      FOREIGN KEY(account_number) REFERENCES account(account_number)
  );`,
      (err, result) => {
        if (err) throw err;
        console.log('account_changes table created');
      },
    );
  }
});
