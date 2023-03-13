var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "siri_admin",
  password: "aA@816953719",
  database: "siri_siriussDB"
});


export default function getUsers(){
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM user", function (err, result, fields) {
          if (err) throw err;
          return result;
        });
      });
}