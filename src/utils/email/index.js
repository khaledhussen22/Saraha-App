import nodemailer from"nodemailer";


export const  sendemail=async ({to,subject,html})=>{
//transporter >>generate
   const transporter= nodemailer.createTransport({
        // serviec,outlook,gmail,yahoo
        host:"smtp.gmail.com",//search smtp for any way you want
        port:587,
        secure:false,//true >>tls encryption
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD,
        }
    });
    const info=await transporter.sendMail({
        from:`"saraha-app"<${process.env.EMAIL}>`,
        to,
        subject,
        text:"hi",
        html,
    })
    if (info.rejected.length >0) return false;
    return true;
    console.log(info);
    
}