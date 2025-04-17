import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { messages } from "../utils/messages/index.js";
import { verifyToken } from "../utils/index.js";

export const isauth=async(req,res,next)=>{
try {
    const {authorization}=req.headers;
if(!authorization)
 return res.status(400).json({message:"required  token"})
if(!authorization.startsWith("hambozo"))
 return res.status(500).json({message:"invalid berror"});
  const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "JWT must be provided" });
      }
      
    const {id,iat}=verifyToken(token);
 
  const userExist= await User.findById(id);
  if(!userExist){
      return res.status(404).json({message:messages.user.notFound})
  }


  if(userExist.isDeleted==true) return next(new Error("login first",{cause:400}));

  if(userExist.deletedAt.getTime()>iat*1000) return next(new Error("invalid token",{cause:400})) 


//pass data of user to req
req.userExist=userExist;


return next();



} catch (error) {
    return res.status(400).json({message:error.message })
}
}