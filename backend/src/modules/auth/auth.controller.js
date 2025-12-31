import asyncHandler from "express-async-handler";
import ApiResponse from "../../utility/ApiResponse.js";
import authService from "./auth.service.js";

export const registerUser = asyncHandler(async (req, res) => {
  const userInfoObj = req.body;

  const user = await authService.registerUserEntry(userInfoObj);

  const resObjToClient = {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar : user.avatar
  };

  return res
    .status(201)
    .json(new ApiResponse(201, "User Registered Successfully", resObjToClient));
});

export const loginTheUser = asyncHandler(async (req, res) => {
  const userInfoObj = req.body;

  const login = await authService.logInUserEntry(userInfoObj);

  const { accessToken, refreshToken, user } = login;

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 604800000, // 7 days
    })
    .json(
      new ApiResponse(200, "User Logged-In Successfully.", {
        accessToken,
        user,
      })
    );
});

export const logOutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const refreshToken = req.cookies.refreshToken;

  const loggedOutUser = await authService.logOutUserEntry(userId , refreshToken);

  return res.status(200).clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  })
  .json({ statusCode : 200 , message : "User Logged Out Successfully." });
});



export const assignNewToken = asyncHandler( async (req , res) => {
  const userId = req.refToken.id;
  const refreshToken = req.cookies.refToken;

  const accessToken = await authService.generateNewAccessToken(userId ,refreshToken);

  return res
  .status(200)
  .json(new ApiResponse(200 , "Access Token Renewed" , accessToken));
} ) 



export const changePassword = asyncHandler(async (req , res) => {
  const userId = req.user.id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const refreshToken = req.cookies.refreshToken;

  const user = await authService.changeUserPassword(userId , oldPassword , newPassword , refreshToken)

  const resObjForClient = {
    id : user._id,
    name : user.name,
    email : user.email,
    avatar : user.avatar
  }

  return res
  .status(200)
  .json(new ApiResponse(200, "Password Changed Successfully.", resObjForClient));
})



export const deleteRegisterUser = asyncHandler(async (req , res) => {
  const userId = req.user.id;
  const refreshToken = req.cookies.refreshToken;

  const deleteUser = await authService.deleteUserEntry(userId , refreshToken);

  return res
  .status(204)
  .clearCookie("refreshToken" , {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
  })
  .json({statusCode : 204 , message : "User Account Deleted"});
})