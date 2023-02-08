var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

connection.query('DROP DATABASE IF EXISTS meetup', function (error, results) {
  if (error) throw error;
  console.table(results);
});
connection.query('CREATE DATABASE meetup', function (error, results) {
  if (error) throw error;
  console.table(results);
});
connection.query('USE meetup');

let inviteeSql =
  'CREATE TABLE Invitee  (invitee_no INT, invitee_name VARCHAR(50),invited_by VARCHAR(50) )';
connection.query(inviteeSql, function (error, results) {
  if (error) throw error;
  console.table(results);
});

let roomSql =
  'CREATE TABLE Room  (room_no INT, room_name VARCHAR(50),floor_number INT )';
connection.query(roomSql, function (error, results) {
  if (error) throw error;
  console.table(results);
});

let meetingSql =
  'CREATE TABLE Meeting (meeting_no INT, meeting_title VARCHAR(50) , starting_time DATETIME, ending_time DATETIME, room_no INT)';
connection.query(meetingSql, function (error, results) {
  if (error) throw error;
  console.table(results);
});

connection.query(
  `INSERT INTO Invitee 
          VALUES 
            (1, 'rob', 'belal'),
            (2, 'josphine', 'belal'),
            (3, 'fede', 'belal'),
            (4, 'alex', 'belal'),
            (5, 'anas', 'belal')`,

  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  `INSERT INTO Room 
       VALUES 
         (1, 'Room 1', 1),
         (2, 'Room 2', 2),
         (3, 'Room 3', 3),
         (4, 'Room 4', 4),
         (5, 'Room 5', 5)`,

  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);

connection.query(
  `INSERT INTO Meeting 
      VALUES 
        (1, 'StandUp', '2022-01-04 09:00:00', '2022-01-05 17:00:00', 1),
        (2, 'tech meeting', '2022-01-07 09:00:00', '2022-01-08 17:00:00', 2),
        (3, 'social Interview', '2022-01-09 09:00:00', '2022-01-10 17:00:00', 3),
        (4, 'tech Interview', '2022-01-11 09:00:00', '2022-01-12 17:00:00', 4),
        (5, 'Entertainment', '2022-01-13 09:00:00', '2022-05-14 17:00:00', 5)`,

  function (error, results) {
    if (error) throw error;
    console.table(results);
  },
);
