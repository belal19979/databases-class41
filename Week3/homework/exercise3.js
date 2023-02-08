const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});


conn.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Database connected..');
});

function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ? WHERE Name = ? and code = ?`,
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
    },
  );
}

//1. Give an example of a value that can be passed as name and code
//that would take advantage of SQL-injection and (fetch all the records in the database)
//const select_query = `select * from ${table} WHERE Name= '${name}' AND code='${code}'`;
//Answer
//name= 'mo' OR 1=1
//code = 2545 OR 1=1