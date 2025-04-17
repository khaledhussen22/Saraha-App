
import connectDB from "./db/connection.js";
import authRouter from "./modules/auth/auth.controller.js"
import userRouter from "./modules/user/user.controller.js"
import messageRoter from "./modules/message/message.controller.js"

import { globalError } from "./utils/errors/global.error.js";
import { notFound } from "./utils/errors/not-found.js";
const bootstrap=async (app,express)=>{
    app.use(express.json());
    await connectDB()

app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/message",messageRoter)



    app.all("*",notFound)
    app.use(globalError)

}
export default bootstrap;
