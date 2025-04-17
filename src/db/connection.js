import mongoose from "mongoose";//thied party


async function connectDB(){
  await  mongoose
  .connect(process.env.DB_URL1)
  .then(()=>{
    console.log("db connected successfully");
  })
  .catch((error)=>{
    console.log("error connecting db",error.message);
  })
}
export default connectDB;