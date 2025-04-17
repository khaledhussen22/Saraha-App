import { Router } from "express";
import *as userService from "./user.service.js"
import { isauth } from "../../middleware/authentication.middleware.js";
import { asyncHandler } from "../../utils/index.js";

const router= Router();

router.get("/profile",isauth,userService.getprofile)
router.delete("/freeze",isauth,asyncHandler(userService.freezeAcc))


export default router;
