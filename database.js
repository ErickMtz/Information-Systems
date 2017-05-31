var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345"
});

con.connect(function(err) {
  if (err) console.log("Error");
  else console.log("Connected!");
  con.query("DROP DATABASE IF EXISTS schedule", function (err, result) {
    if (err) console.log("Error");
    else console.log("Database deleted");
    con.query("CREATE DATABASE schedule", function (err, result) {
      if(err) console.log("Error");
      else console.log("Database schedule created");
      process.exit(1);
     });
  });
});
