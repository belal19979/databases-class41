const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});


connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Database connected..');
});

//Re-writing the function
function getPopulation(Country, name, code, cb) {
  connection.query(
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