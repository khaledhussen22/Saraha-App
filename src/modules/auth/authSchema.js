import joi from "joi"
export let register=joi.object({
    userName:joi.string().max(20).required(),
    phone: joi.string().min(9).max(13).required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    cPassword:joi.string().valid(joi.ref("password")),
    id:joi.custom((value,helper)=>{
    if (value>24)return true;
    return helper.message("not valid id");
    }),
}).required();

export let login=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(),
   
}).required();

