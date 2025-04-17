import jwt from "jsonwebtoken"
import { User } from "../../models/user.model.js";
import CryptoJS from "crypto-js";
import { decrypt } from "../../utils/crypto/decrypt.js";
import { messages } from "../../utils/messages/index.js";
export const getprofile=async (req,res,next)=>{
  try {
      const userExist=req.user;
      userExist.phone=decrypt({data:userExist.phone})
    return res.status(200).json({success:true,data:userExist})
  
  } catch (error) {
    return res.status(500).json({success:false,error:error.message,message:"ond"})
  }

}

export const freezeAcc=async (req,res,next)=>{
await User.updateOne({_id:req.userExist._id},{isDeleted:true,deletedAt:Date.now()})
return res.status(200).json({success:true,message:"user deleted successfully "})

};