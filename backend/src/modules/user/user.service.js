import ApiError from "../../utility/ApiError";
import {Auth} from "../auth/auth.model.js"

const userService = {
    updateUserEntry : async (userId , userInfoObj , refreshToken) => {
        // check for user
        let findUser = await Auth.findById(userId);

        if(!findUser) throw new ApiError(404 , "User Not Found");

        // validate ownership
        const validateOwnership = await findUser.compareRefreshToken(refreshToken);

        if(!validateOwnership) throw new ApiError(401, "Provide Valid Token");

        const updateEntry = await Auth.findByIdAndUpdate(userId , userInfoObj , { new : true });

        if(!updateEntry) throw new ApiError(500 , "Error Occurred while updating user entry");

        return updateEntry;
        
    },

    getUserEntry : async (userId) => {
        // find user 
        const user = await Auth.findById(userId).select("-password")

        if(!user) throw new ApiError(404 , "User Not Found");

        return user;
    }
}

export default userService;