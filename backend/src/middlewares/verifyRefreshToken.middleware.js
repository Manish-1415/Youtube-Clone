import ApiError from "../utility/ApiError.js";
import { verifyRefreshToken } from "../utility/tokens.js";

const validateRefreshToken = (req , res , next) => {
    try {
        if(!req.cookies.refreshToken) throw new ApiError(400 , "Please Provide Valid Refresh Token");

        const refreshTokenPayload = verifyRefreshToken(req.cookies.refreshToken);

        req.refToken = refreshTokenPayload;

    } catch (error) {
        console.log(error);
        next(error);
    }
}

export default validateRefreshToken;