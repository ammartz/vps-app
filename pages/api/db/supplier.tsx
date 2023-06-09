// This is an example of to protect an API route
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import {getSupplier} from "../../../lib/db"
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
     res.status(200).send({
      done: false,
      result: {mesage: "Login"}})
  }
  
    
    await getSupplier(req.body.email, function(result){
      console.log(result)
       res.status(200).send({
        done: true,
        result})
  })

  



}
