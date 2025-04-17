import joi from "joi"
import { Types } from "mongoose";
import { isValidId } from "../../middleware/validation.middelware.js";

export const sendMessage=joi.object({

    content:joi.string().required(),
    // reciever:joi.string().hex().length(24).required(),
    reciever:joi.custom(isValidId).required(),

    sender:joi.custom(isValidId).optional(),

}).required();

export const deleteMessage=joi.object({
    id:joi.custom(isValidId).required()
}).required();


