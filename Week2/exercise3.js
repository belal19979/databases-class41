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
      `
      SELECT  authors.author_id AS 'Author ID',
      authors.author_name AS 'Author Name',
      mentors.author_name AS 'Mentor Name'
      FROM authors
      JOIN authors mentors
      ON authors.mentor = mentors.author_id;
      `,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      },
    );

    connection.query(
      `
      SELECT authors.*, research_papers.paper_title 
      FROM authors 
      LEFT JOIN authorsPaper 
      ON authorsPaper.author_id = authors.author_id 
      LEFT JOIN research_papers 
      ON authorsPaper.paper_id = research_papers.paper_id;
      `,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      },
    );
  }
});