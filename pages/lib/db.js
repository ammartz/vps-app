

// get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'siri_admin',
  password: 'aA@816953719',
  database: 'siri_siriussDB',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0
});

export async function getSuppliers(callb){
pool.execute(
    'SELECT * FROM supplier ',[],
    function(err, results, fields) {
        if(err){
            console.log(err) 
            return
        }
        return callb(JSON.stringify(results))      
    }
  );
}

export async function getItemsLeft(user_email, callb){
    pool.execute(
        'SELECT COUNT(itemID) AS NumberOfItems FROM items WHERE itemID NOT IN (SELECT itemID FROM user_data WHERE userId = ?); ',[user_email],
        
        function(err, results, fields) {
            if(err){
                console.log(err) 
                return
            }
            return callb(JSON.stringify(results))      
        }
      );
    }

    export async function getItemsDone(user_email, callb){
        pool.execute(
            'SELECT COUNT(itemID) AS NumberOfItems FROM items WHERE itemID IN (SELECT itemID FROM user_data WHERE userId = ?); ',[user_email],
            
            function(err, results, fields) {
                if(err){
                    console.log(err) 
                    return
                }
                return callb(JSON.stringify(results))      
            }
          );
        }

export async function getUnverifyedItem(user_email, callb){
    pool.execute(
        'SELECT * FROM items WHERE itemID NOT IN (SELECT itemID FROM user_data WHERE userId = ?) LIMIT 1; ',[user_email],
        function(err, results, fields) {
            if(err){
                console.log(err) 
                return
            }
            return callb(JSON.stringify(results))      
        }
        );
    }