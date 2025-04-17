import { User } from "../../models/user.model.js";
import { asyncHandler, compare, encryption, generateToken, hashing, sendemail, verifyToken } from "../../utils/index.js";

export const register =async(req,res,next)=>{
    
        //get data from request
    
        const{userName,email,password,phone}=req.body;
        const createduser=await User.create({
            userName,
            email,
            password: hashing({data:password}),
            phone:encryption({data:phone})
        })
    const token=generateToken({
        payload:{id:createduser._id},
        options:{expiresIn:"15y"},
    })
    const link=`http://localhost:3000/auth/activate-account/${token}`
    
       const isSent= await sendemail({ 
        to:email,
        subject:`verify acount my dear ${email}`,
        html:`<p>to verify your account please click here<a href=${link}>link </a></p>`,
    })
    if(!isSent) return next(new Error('email not sent please try again ',{cause:500}))
        
    return res.status(200).json({message:"user created successfully",data:createduser})
    };


export const login=asyncHandler(async(req,res,next)=>{

  
    const{email,password}=req.body

    const userExist=await User.findOne({email})

    if(!userExist){
        return next(new Error('user not exist',{cause:404}))
    }
const matched =compare({data:password,hashData:userExist.password})
if(!matched){
    return next(new Error('incorrect password',{cause:500}))
}
if (!userExist.isConfirmed) {
    return next(new Error('verify your emial',{cause:500}))
}
if (userExist.isDeleted==true){
    await User.updateOne({_id:userExist._id},{isDeleted:false})
}
// const token =jwt.sign({email,id:userExist._id},process.env.SECRET_KEY);
const token=generateToken({payload:{email,id:userExist._id},options:{expiresIn:"1y"}})

return res.status(200).json({
    message: "logged in succesfully",
    success:true,
    token,

})      
});

export const activateAccount=asyncHandler(async(req,res,next)=>{

   const{token}=req.params
   const{id,error}=verifyToken(token);
   if(error) return next(error);

   const user= await User.findByIdAndUpdate(id,{isConfirmed:true});
   if(!user) return next(new Error("user not found ",{cause:404}))
    
    return res
    .status(200)
    .json({success:true,message:"congratulation,plz login"});

    
});