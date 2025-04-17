import { Router } from "express";
import { isValid } from "../../middleware/validation.middelware.js";
import * as messageValidation from './messageSchema.js'
import { asyncHandler } from "../../utils/index.js";
import * as MS from "./message.service.js"
import { isauth } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { roles } from "../../models/user.model.js";
import { endpoint } from "./message.endpoint.js";
 const router= Router();

 router.post("/",isValid(messageValidation.sendMessage),asyncHandler(MS.sendMessage))
 router.get("/",isauth,isAuthorized(...endpoint.getMessage),asyncHandler(MS.getMessage))
 router.delete("/:id",isauth,isAuthorized(...endpoint.deletemessagee),isValid(messageValidation.deleteMessage),asyncHandler(MS.delMessage))


 export default router;
