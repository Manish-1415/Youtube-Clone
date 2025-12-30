import ApiError from "../utility/ApiError";
import { verifyAccessToken } from "../utility/tokens";

const validateUserMiddleware = (req, res, next) => {
  // validate access token
  try {
    if (!req.headers.authorization)
      throw new ApiError(401, "Please Provide Valid Access Token");

    const accessToken = req.header.authorization.split(" ")[1];

    const validateToken = verifyAccessToken(accessToken);

    req.user = validateToken;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default validateUserMiddleware;
