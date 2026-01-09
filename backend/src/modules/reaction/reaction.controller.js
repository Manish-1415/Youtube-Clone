import asyncHandler from "express-async-handler";
import ApiResponse from "../../utility/ApiResponse.js";
import reactionService from "./reaction.service.js";


export const generateNewReaction = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const targetId = req.body.targetId;
    const targetType = req.body.targetType;
    const reactionByUser = req.body.reaction;

    const reaction = await reactionService.createReactionEntry(userId , targetId , targetType , reactionByUser);

    return res
    .status(201)
    .json(new ApiResponse(201 , "Reaction Created Successfully .", reaction));
});


export const deleteReaction = asyncHandler(async (req , res) => {
    const reactionId = req.params.reactionId;
    const userId = req.user.id;

    const deletedReaction = await reactionService.deleteReactionEntry(reactionId , userId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Reaction Deleted Successfully" , deletedReaction));
})


export const toggleReaction = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const reactionId = req.params.id;

    const updateReaction = await reactionService.updateReactionEntry(userId , reactionId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Reaction Updated Successfully" , updateReaction));
})



export const getReactions = asyncHandler(async (req , res) => {
    const targetId = req.params.targetId;
    const targetType = req.params.targetType;

    const reactions = await reactionService.getReactionsOnATargetType(targetId , targetType);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Reactions Fetched Successfully", reactions));
})



export const getUserReaction = asyncHandler(async (req , res) => {
    const targetId = req.params.targetId;
    const userId = req.user.id;
    const targetType = req.params.targetType;

    const reaction = await reactionService.getUserReactionEntry(targetId , userId , targetType);

    return res
    .status(200)
    .json(new ApiResponse(200 , "User Reaction Fetched", reaction));
})