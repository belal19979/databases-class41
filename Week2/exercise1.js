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

    connection.query(`DROP DATABASE IF EXISTS db_week2`, (err, result) => {
      if (err) throw err;
      console.log(' database deleted');
    });

    const query = `CREATE DATABASE db_week2`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log('New database created');
    });

    connection.query(`USE db_week2`, (err, result) => {
      if (err) throw err;
      console.log(result);
    });

    connection.query(
      ` CREATE TABLE authors (author_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        author_name VARCHAR (50) NOT NULL,
        university VARCHAR (150),
        date_of_birth DATE,
        h_index INT,
        gender ENUM('M','F'))`,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      },
    );

    connection.query(
      `ALTER TABLE authors
       ADD COLUMN mentor INT,
       ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_id) `,
      (err, result) => {
        if (err) throw err;
        console.log(result);

      },
    );
  }
});
