import { InternalError } from "../core/customError.js";
import { RoleCode, RoleModel } from "../models/roleModel.js";
import { Types } from "mongoose";

async function getRole(role: RoleCode): Promise<Types.ObjectId | null> {
    try {
        const userRole = await RoleModel.findOne({
            code: role,
            status: true
        })

        if (!userRole) throw new InternalError("User Role not Found")
        
        return userRole._id
    } catch (error) {
        throw new InternalError("User Role not Found")
    }
}

export default getRole