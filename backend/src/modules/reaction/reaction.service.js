import ApiError from "../../utility/ApiError";
import { Reaction } from "./reaction.model";

// we will not store likeCount & dislikeCount in video - because reaction frequently changes & the load will be transfer to the Video module thats why , separation of concern.

const reactionService = {
    createReactionEntry : async (userId , targetId , targetType , reaction) => {
        // find the entry first 
        const findReaction = await Reaction.findOne({userId , targetId , targetType});

        if(findReaction) throw new ApiError(400 , "Reaction is Already Existed.");

        // if there is no like then ,
        const reactionObj = {
            userId ,
            targetId ,
            targetType,
            reaction
        }

        const createNewReaction = await Reaction.create(reactionObj);

        if(!createNewReaction) throw new ApiError(500 , "Error Occurred while Creating a Reaction");

        // update the count.
        const likesCount = await Reaction.countDocuments({targetId , targetType , reaction : "like"});

        const dislikeCount = await Reaction.countDocuments({targetId , targetType , reaction : "dislike"});

        return {reaction : createNewReaction , likesCount , dislikeCount}
    },

    deleteReactionEntry : async (reactionId , userId) => {
        // find reaction.
        const findReaction = await Reaction.findById(reactionId);

        if(!findReaction) throw new ApiError(404 , "Reaction Is Not Present");

        // if there then check ownership
        if(findReaction.userId.toString() !== userId.toString()) throw new ApiError(401, "User is Unauthorized to Perform this Operation");

        // now finally delete reaction

        const findAndDeleteReaction = await Reaction.findByIdAndDelete(reactionId);

        if(!findAndDeleteReaction) throw new ApiError(500 , "Error Occurred while deleting the Reaction");

        // update the count 

        const likesCount = await Reaction.countDocuments({targetId : findReaction.targetId , targetType : findReaction.targetType , reaction : "like"});

        const dislikeCount = await Reaction.countDocuments({targetId : findReaction.targetId , targetType :findReaction.targetType , reaction : "dislike"});

        return {likesCount , dislikeCount , message : "Reaction Deleted"}
    },

    updateReactionEntry : async (userId , reactionId) => {
        // find reaction
        let findReaction = await Reaction.findById(reactionId);

        if(!findReaction) throw new ApiError(404 , "Reaction Not Found To update");

        if(findReaction.userId.toString() !== userId.toString()) throw new ApiError(401 , "User is Not Authorized to perform this Operation");

        findReaction.reaction = findReaction.reaction == "like" ? "dislike" : "like";

        await findReaction.save();

        const likesCount = await Reaction.countDocuments({targetId : findReaction.targetId , targetType : findReaction.targetType , reaction :"like" });
        const dislikeCount = await Reaction.countDocuments({targetId : findReaction.targetId , targetType : findReaction.targetType , reaction : "dislike"});

        return {message : "Reaction Updated" , likesCount , dislikeCount}
    },


    getReactionsOnATargetType : async (targetId , targetType) => {
        // Always get the data from frontend whcich u want to search in backend . u can also get 2 datas from params.

        // find documents first
        const reactionsOnAType = await Reaction.countDocuments({targetId , targetType});

        if(reactionsOnAType === 0 ) {
            return {
                likesCount : 0,
                dislikeCount : 0,
            }
        }

        const likesCount = await Reaction.countDocuments({targetId , targetType : reactionsOnAType.targetType , reaction : "like"});
        const dislikeCount = await Reaction.countDocuments({targetId , targetType : reactionsOnAType.targetType , reaction : "dislike"});
        return { likesCount , dislikeCount }

    },

    getUserReactionEntry : async (targetId , userId) => {
        // find usersReaction 
        const findReaction = await Reaction.findOne({userId , targetId});

        if(!findReaction) {
            return { userReaction : null }
        }

        return { userReaction : findReaction.reaction }
    }
}

export default reactionService;