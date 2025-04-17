import { Router } from "express";
import * as authService from "./auth.service.js"
import { asyncHandler } from "../../utils/errors/asynchandler.js";
import *as authSchemas from "./authSchema.js"
import { isValid } from "../../middleware/validation.middelware.js";
const router=Router();

router.post("/register",isValid(authSchemas.register),asyncHandler(authService.register))
router.post("/login",isValid(authSchemas.login),authService.login)

router.get("/activate-account/:token",authService.activateAccount)



export default router;