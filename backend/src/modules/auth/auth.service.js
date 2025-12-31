import ApiError from "../../utility/ApiError.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../../utility/tokens.js";
import { Auth } from "./auth.model.js"

const authService = {
    registerUserEntry : async (userInfoObj) => {
        // find if user Already exist or not
        const userExist = await Auth.findOne({email : userInfoObj.email});

        if(userExist) throw new ApiError(400 , "User Already Registered , Please Log in");

        const userEntryObj = {
            name : userInfoObj.name,
            email : userInfoObj.email,
            password : userInfoObj.password,
            avatar : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740&q=80"
        }

        // save the entry

        const user = await Auth.create(userEntryObj);

        if(!user) throw new ApiError(500 , "Error Occurred While Registering User");

        return user;
    },

    logInUserEntry : async (userInfoObj) => {
        // find if user already exist or not
        let findUser = await Auth.findOne({email : userInfoObj.email});

        if(!findUser) throw new ApiError(404 , "Please Register The User First");

        // if user is there then compare password firstly
        const comparePassword = await findUser.comparePassword(userInfoObj.password);

        if(!comparePassword) throw new ApiError(400 , "Invalid Password");

        const accessPayload = {
            id : findUser._id,
            name : findUser.name,
            email : findUser.email
        }

        const accessToken = createAccessToken(accessPayload);

        // refresh token 

        let refreshToken = createRefreshToken({id : findUser._id})

        findUser.refreshToken = refreshToken;
        await findUser.save();

        return { accessToken , refreshToken , user : findUser }
    },

    logOutUserEntry : async (userId , refreshToken) => {
        // find user 

        let user = await Auth.findById(userId);

        if(!user) throw new ApiError(404 , "User Not Found TO LogOut");

        // check 
        const checkOwnership = await user.compareRefreshToken(refreshToken)

        if(!checkOwnership) throw new ApiError(401 , "Provide Valid refreshToken");

        user.refreshToken = null;

        await user.save();

        return user;
    },

    generateNewAccessToken : async (userId , refreshToken) => {
        // check the user id first in db
        const findUser = await Auth.findById(userId);

        if(!findUser) throw new ApiError(404 , "User Not Found");

        // now if user is there then verify the tokens
        const verifyRefreshToken = await findUser.compareRefreshToken(refreshToken);

        if(!verifyRefreshToken) throw new ApiError(401 , "User is Unauthorized to Perform this Operation");

        // now simply generate new access token
        const accessPayload = {
            id : findUser._id,
            name : findUser.name,
            email : findUser.email
        }

        const accessToken = createAccessToken(accessPayload);

        return accessToken;
    },

    changeUserPassword : async (userId , oldPassword , newPassword , refreshToken) => {
        // find user
        let user = await Auth.findById(userId);

        if(!user) throw new ApiError(404 , "User Not Found");

        const validateOwnerShip = await user.compareRefreshToken(refreshToken);

        if(!validateOwnerShip) throw new ApiError(401 , "User is not authorized to perform this operation");

        const checkPassword = await user.comparePassword(oldPassword);

        if(!checkPassword) throw new ApiError(400, "Please Provide Valid Password")

        user.password = newPassword;
        return await user.save();
    },

    deleteUserEntry : async(userId , refreshToken) => {
        // find user
        const findUser = await Auth.findById(userId);

        if(!findUser) throw new ApiError(404 , "User Not Found");

        const checkOwnership = await findUser.compareRefreshToken(refreshToken);

        if(!checkOwnership) throw new ApiError(401 , "User is not authorized to perform this operation");

        const deleteUser = await Auth.findByIdAndDelete(userId);

        if(!deleteUser) throw new ApiError(500 , "Error Occurred while deleting user");

        return deleteUser;
    }
}

export default authService;