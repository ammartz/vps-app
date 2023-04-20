

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
        'SELECT COUNT(itemID) AS NumberOfItems FROM items WHERE itemID NOT IN (SELECT itemID FROM user_data WHERE userId = ?) AND brand != "carrefour"; ',[user_email],
        
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
            'SELECT COUNT(itemID) AS NumberOfItems FROM items WHERE itemID IN (SELECT itemID FROM user_data WHERE userId = ?) AND brand != "carrefour"; ',[user_email],
            
            function(err, results, fields) {
                if(err){
                    console.log(err) 
                    return
                }
                return callb(JSON.stringify(results))      
            }
          );
        }


        export async function getItemsDoneList(user_email, callb){
            pool.execute(
                'SELECT * FROM user_data  INNER JOIN items ON user_data.itemID = items.itemID AND `userID` = ? AND items.brand != "carrefour"',[user_email],
                
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
        'SELECT * FROM items WHERE itemID NOT IN (SELECT itemID FROM user_data WHERE userId = ?) AND brand != "carrefour" LIMIT 1; ',[user_email],
        function(err, results, fields) {
            if(err){
                console.log(err) 
                return
            }
            return callb(JSON.stringify(results))      
        }
        );
    }

    export async function submitItem(user_email, item_URL, itemFound, itemID, suppID, callb){
        pool.execute(
            'INSERT INTO user_data (userID, item_URL, found, supID, itemID) VALUES (?, ?, ?, ?, ?)',[user_email, item_URL, itemFound, suppID, itemID],
            function(err, results, fields) {
                if(err){
                    console.log(err) 
                    return
                }
                return callb(JSON.stringify(results))      
            }
            );
        }


        export async function registerUserToDB(user_email, callb){
            pool.execute(
                'SELECT email FROM user WHERE email = ?',[user_email],
                function(err, results, fields) {
                    if(err){
                        console.log(err) 
                        return
                    }
                    
                    if(results == []){

                        pool.execute(
                            'INSERT INTO user (id, email) VALUES (?, ?)',[user_email, user_email],
                            function(err, results, fields) {
                                if(err){
                                    console.log(err) 
                                    return
                                }
                                return callb(JSON.stringify(results))      
                            }
                            );

                    }
                    console.log("User Is Registered")
                    return callb(JSON.stringify(results))      
                }
                );

            
            }