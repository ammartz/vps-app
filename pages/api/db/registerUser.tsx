// This is an example of to protect an API route
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import {registerUserToDB} from "../../lib/db"
export const config = {
  api: {
    externalResolver: true,
  },
}


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
  var data = req.body
  
   if(session.user.email === data.email){
    await registerUserToDB(data.email ,function(result){
      return res.status(200).send({
       done: true})
 })
   } 
    

   return res.status(200).send({done: true})
  



}
