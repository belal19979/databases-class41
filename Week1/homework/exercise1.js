var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'meetup'
});

connection.connect(() => console.log('mySql Connected'));

connection.query('DROP DATABASE IF EXISTS meetup');
connection.query('CREATE DATABASE meetup', () => { console.log('meet up created') });
connection.query('USE meetup');

let inviteeSql = "CREATE TABLE Invitee  (invitee_no INT, invitee_name VARCHAR(50),invited_by VARCHAR(50) )";
connection.query(inviteeSql)

let roomSql = "CREATE TABLE Room  (room_no INT, room_name VARCHAR(50),floor_number INT )";
connection.query(roomSql)

let meetingSql = "CREATE TABLE Meeting (meeting_no INT, meeting_title VARCHAR(50) , starting_time DATETIME, ending_time DATETIME, room_no INT)"
connection.query(meetingSql)

connection.query(
  `INSERT INTO Invitee 
          VALUES 
            (1, 'rob', 'belal'),
            (2, 'josphine', 'belal'),
            (3, 'fede', 'belal'),
            (4, 'alex', 'belal'),
            (5, 'anas', 'belal')`,
);

connection.query(
  `INSERT INTO Room 
       VALUES 
         (1, 'Room 1', 1),
         (2, 'Room 2', 2),
         (3, 'Room 3', 3),
         (4, 'Room 4', 4),
         (5, 'Room 5', 5)`,
);

connection.query(
  `INSERT INTO Meeting 
      VALUES 
        (1, 'StandUp', '2022-01-04 09:00:00', '2022-01-05 17:00:00', 1),
        (2, 'tech meeting', '2022-01-07 09:00:00', '2022-01-08 17:00:00', 2),
        (3, 'social Interview', '2022-01-09 09:00:00', '2022-01-10 17:00:00', 3),
        (4, 'tech Interview', '2022-01-11 09:00:00', '2022-01-12 17:00:00', 4),
        (5, 'Entertainment', '2022-01-13 09:00:00', '2022-05-14 17:00:00', 5)`,
);
