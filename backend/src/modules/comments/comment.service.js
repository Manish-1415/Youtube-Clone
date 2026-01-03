import ApiError from "../../utility/ApiError"
import { Comment } from "./comment.model"

const commentService = {
    createCommentEntry : async (videoId , userId , commentByUser) => {
        // here multiple comments by same user is ok.

        const commentObj = {
            videoId ,
            authorUserId : userId ,
            content : commentByUser
        }

        const comment = await Comment.create(commentObj);

        if(!comment) throw new ApiError(500 , "Error Occurred While Creating Comments");

        return comment;
    },

    updateUserCommentEntry : async (userId , commentByUser , commentId) => {
        // find the comment first 
        let findComment = await Comment.findById(commentId);

        if(!findComment) throw new ApiError(404 , "Comment Does Not Exist");

        if(findComment.authorUserId.toString() !== userId.toString()) throw new ApiError(401, "User is Not Authorized to perform this Operation");  // Ownership check

        // findAndUpdateTheComment

        const findAndUpdateComment = await Comment.findByIdAndUpdate(commentId , {content : commentByUser} , {new : true});

        if(!findAndUpdateComment) throw new ApiError(500 , "Error Occurr While Updating the Comment");

        return findAndUpdateComment;
    },

    deleteUserComment : async (commentId , userId) => {
        // find the comment
        const findComment = await Comment.findById(commentId);
        
        if(!findComment) throw new ApiError(404 , "Comment Not Found");

        if(findComment.authorUserId.toString() !== userId.toString()) throw new ApiError(401 , "User is Not Authorized to perform this Operation");

        // now if owner is correct then delete comment

        const findAndDeleteComment = await Comment.findByIdAndDelete(commentId);

        if(!findAndDeleteComment) throw new ApiError(500 , "Error Occurred While Deleting the Comment");

        return findAndDeleteComment;
    },

    getAllComments : async (videoId) => {
        // find comments
        const comments = await Comment.find({videoId});

        return comments;
    }
}

export default commentService;