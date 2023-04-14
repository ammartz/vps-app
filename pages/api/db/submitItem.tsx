// This is an example of to protect an API route
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import {submitItem} from "../../lib/db"
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
  
    
    await submitItem(data.email, data.itemURL, data.itemFound, data.itemID, data.supID ,function(result){
       return res.status(200).send({
        done: true})
  })

  



}
