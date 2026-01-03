import asyncHandler from "express-async-handler"
import ApiResponse from "../../utility/ApiResponse"
import commentService from "./comment.service";

export const createComment = asyncHandler(async (req , res) => {
    const videoId = req.params.videoId;
    const userId = req.user.id;
    const commentByUser = req.body.comment;


    const comment = await commentService.createCommentEntry(videoId , userId , commentByUser);

    return res
    .status(201)
    .json(new ApiResponse(201 , "Comment Created Successfully", comment));
});


export const updateComment = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const updatedComment = req.body.comment;
    const commentId = req.params.commentId;

    const updateUserComment = await commentService.updateUserCommentEntry(userId , updatedComment , commentId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Comment Updated Successfully", updateUserComment));
});



export const deleteComment = asyncHandler(async (req , res) => {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    const deletedComment = await commentService.deleteUserComment(commentId , userId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Comment Deleted Successfully", {deletedComment : deletedComment.content , id : commentId}));
});



export const getCommentsOnAVideo = asyncHandler(async (req , res) => {
    const videoId = req.params.videoId;

    const comments = await commentService.getAllComments(videoId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Comments Fetched Successfully", comments));
})