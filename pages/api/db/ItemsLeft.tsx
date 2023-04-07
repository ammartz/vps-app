// This is an example of to protect an API route
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import {getItemsLeft} from "../../lib/db"



// get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: '82.180.160.86',
  user: 'siri_admin',
  password: 'aA@816953719',
  database: 'siri_siriussDB',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0
});



import type { NextApiRequest, NextApiResponse } from "next"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)


  if(session == null){
     return res.status(200).send({
      done: false,
      result: {mesage: "Login"}})
  }
  
    
    await getItemsLeft(session.user.email ,function(result){
       return res.status(200).send({
        done: true,
        result})
  })

  



}
