import { roles } from "../../models/user.model.js";

export const endpoint ={
    getMessage:[roles.USER,roles.ADMIN],
    deletemessagee:[roles.USER]


}