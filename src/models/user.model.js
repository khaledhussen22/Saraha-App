import { Schema,model } from "mongoose";

export const genders={
    Male:"male",
    M:"m",
    F:"f",
    FEMALE:"female"
};
Object.values(genders);//["male","female","m","f"]
Object.keys(genders);//["MALE","FEMALE",'M',"F"]

export const roles={
    USER:"user",
    ADMIN:"admin",
}

const userSchema=new Schema(
    {
        email:{type:String,required:[true,"email is required"],unique:[true,"email already exist"],lowercase:true},
        password:{type:String,requird:true},
        userName:{type:String,requird:true,unique:[true,"userName already exist"]},
        phone:{type:String,required:true,unique:[true,"phone already"]},
        gender:{type:String,
            enum:Object.values(genders),
        },
        role:{type:String,enum:Object.values(roles),default:roles.user},
        isDeleted:{type:Boolean,default:false},
        isConfirmed:{type:Boolean,default:false},
        deletedAt:{type:Date}
    },
    {
        timestamps:true
    }

);
export const User=model("user",userSchema)