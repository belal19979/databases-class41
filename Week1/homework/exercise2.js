var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_World',
});

connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

connection.query(
  'SELECT Name FROM country WHERE Population > 8000000;',
  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000',
  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  "SELECT Name FROM country WHERE Continent = 'Europe'",
  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  'SELECT Name FROM country ORDER BY SurfaceArea DESC',
  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  "SELECT Name FROM city WHERE CountryCode = 'NLD'",
  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  "SELECT Population FROM city WHERE Name = 'Rotterdam'",
  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  'SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10',
  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  'SELECT * FROM city ORDER BY Population DESC LIMIT 10',
  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  'SELECT SUM(Population) FROM country',
  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);
