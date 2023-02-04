const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'db_week2',
});

connection.connect((err) => {
  if (err) {
    console.log('Error occurred', err);
  } else {
    console.log('Connected to MySQL Server');

    connection.query(
      `CREATE TABLE IF NOT EXISTS research_Papers (
      paper_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      paper_title TEXT,
      conference TEXT,
      publish_date DATE
      );`,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      },
    );

    //Many to Many Relationship
    connection.query(
      `CREATE TABLE IF NOT EXISTS authorsPaper (
      id int not NULL PRIMARY KEY AUTO_INCREMENT,
      author_id int not null,
      paper_id int not null,
      FOREIGN KEY (author_id) REFERENCES authors (author_id),
      FOREIGN KEY (paper_id) REFERENCES research_Papers (paper_id)
        );`,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      },
    );

    connection.query(
      `
    INSERT INTO authors(author_name, university, date_of_birth, h_index, gender, mentor) 
    VALUES  ('alpert', 'A University', '1999-12-30', 1, 'M', 1),
            ('andy', 'B University', '1999-12-30', 2, 'M', 1),
            ('alex', 'C University', '1999-12-30', 3, 'M', 1),
            ('jim', 'D University', '1999-12-30', 4, 'M', 1),
            ('micheal', 'E University', '1999-12-30', 5, 'M',1),
            ('tom', 'F University', '1999-12-30', 6, 'M', 1),
            ('pam', 'G University', '1999-12-30', 7, 'F', 1),
            ('kev', 'H University', '1999-12-30', 8, 'M', 1),
            ('oscar', 'I University', '1999-12-30', 9, 'M', 1),
            ('richard', 'J University', '1999-12-30', 10, 'M', 1),
            ('ody', 'K University', '1999-12-30', 11, 'F', 1),
            ('cris', 'L University', '1999-12-30', 12, 'F', 1),
            ('aveal', 'M University', '1999-12-30', 13, 'M', 1),
            ('jayson', 'N University', '1999-12-30', 14, 'M', 1),
            ('jay', 'O University', '1999-12-30', 15, 'M', 1);
    `,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      },
    );

    connection.query(
      `
      INSERT INTO research_Papers(paper_title, conference, publish_date) 
      VALUES ('Research A', 'Conference 1', '2001-01-01'),
             ('Research B', 'Conference 2', '2001-01-01'),
             ('Research C', 'Conference 3', '2001-01-01'),
             ('Research D', 'Conference 4', '2001-01-01'),
             ('Research E', 'Conference 5', '2001-01-01'),
             ('Research F', 'Conference 6', '2001-01-01'),
             ('Research G', 'Conference 7', '2001-01-01'),
             ('Research H', 'Conference 8', '2001-01-01'),
             ('Research I', 'Conference 9', '2001-01-01'),
             ('Research J', 'Conference 10', '2001-01-01'),
             ('Research K', 'Conference 11', '2001-01-01'),
             ('Research L', 'Conference 12', '2001-01-01'),
             ('Research M', 'Conference 13', '2001-01-01'),
             ('Research N', 'Conference 14', '2001-01-01'),
             ('Research O', 'Conference 15', '2001-01-01'),
             ('Research P', 'Conference 16', '2001-01-01'),
             ('Research Q', 'Conference 17', '2001-01-01'),
             ('Research R', 'Conference 18', '2001-01-01'),
             ('Research S', 'Conference 19', '2001-01-01'),
             ('Research T', 'Conference 20', '2001-01-01'),
             ('Research U', 'Conference 21', '2001-01-01'),
             ('Research V', 'Conference 22', '2001-01-01'),
             ('Research Y', 'Conference 23', '2001-01-01'),
             ('Research Z', 'Conference 24', '2001-01-01'),
             ('Research AB', 'Conference 25', '2001-01-01'),
             ('Research BC', 'Conference 26', '2001-01-01'),
             ('Research CD', 'Conference 27', '2001-01-01'),
             ('Research DE', 'Conference 28', '2001-01-01'),
             ('Research EF', 'Conference 29', '2001-01-01'),
             ('Research FG', 'Conference 30', '2001-01-01');

      `,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      },
    );

    connection.query(
      `
      INSERT INTO authorsPaper( author_id, paper_id)
      VALUES 
      (1, 3), (1, 5), (2, 1), ( 2, 5 ), (3, 6), ( 3, 8), (4, 7), (4, 3), (5, 9), (5, 10),
      (6, 7), (6, 12), (7, 13), ( 7, 12 ), (8, 11)
      `,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      },
    );
  }
});

