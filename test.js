import joi from "joi";
//validation data
//data
const data=10;
//scehma >>expected data
const schema=joi.number();
//validate
const result =schema.validate(data,{abortEarly:false})

console.log(result);
