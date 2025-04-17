import { Message } from "../../models/message.model.js"
import { User } from "../../models/user.model.js"
import { messages } from "../../utils/index.js"

export const sendMessage=async(req,res,next)=>{

    //check reciever id
    const {content,reciever}=req.body
    const recieverExist= await User.findById(reciever)//{}|null
if(!recieverExist) return next(new Error(messages.user.notFound,{cause:404}))

  const createdM= await Message.create({content,reciever})

  return res.status(201).json({success:true,message:messages.message.createdSuccessfully,data:createdM})



}

export const getMessage =async (req,res,next)=>{
 const foundM=
 req.query.flag==1
  ? await Message.find({sender:req.userExist._id})
  :await Message.find({reciever:req.userExist._id})

 return res.status(200).json({message:"that is your messages",foundM,success:true})
}

export const delMessage=async(req,res,next)=>{

    
 const result=await Message.deleteOne({_id:req.params.id,reciever:req.userExist._id})

 if(result.deletedCount==0){
    return next(new Error("message not deleted"),{cause:401})

 }
  return res.status(200).json({message:"message deleted succesfully",success:true,result})
}

//to do make update service