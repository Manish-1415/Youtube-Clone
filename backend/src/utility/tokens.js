import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
  } catch (error) {
    console.log(error)
  }
};



export const createRefreshToken = (payload) => {
    try {
        return jwt.sign(
            payload , 
            process.env.REFRESH_SECRET_KEY,
            process.env.REFRESH_TOKEN_EXPIRY
        )
    } catch (error) {
        console.log(error)
    }
}



export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token , process.env.ACCESS_SECRET_KEY)
    } catch (error) {
        console.log(error)
    }
}


export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token , process.env.REFRESH_SECRET_KEY)
    } catch (error) {
        console.log(error)
    }
}