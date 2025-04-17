export const globalError=(error,req,res,next)=>{
    return res
    .status(error.cause||500)//status from 100 to 999
    .json({
        success:false,
        message:error.message,
        stack:error.stack,
    })
}