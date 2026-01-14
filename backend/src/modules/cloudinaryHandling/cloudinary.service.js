import ApiError from "../../utility/ApiError.js"
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudinaryHandlingService = {
    deleteFile : async (payload) => {
        const delFile = await cloudinary.uploader.destroy(payload.publicId)

        if(!delFile) throw new ApiError(500 , "Error Occurred while deleting profile picture");

        return delFile;
    },

    deleteThumbnailAndVideo : async (payload) => {
        const delThumb = await cloudinary.uploader.destroy(payload.thumbnialPublicId);

        if(!delThumb) throw new ApiError(500 , "Error Occurred while deleting thumbnail");

        const delVid = await cloudinary.uploader.destroy(payload.videoPublicId);

        if(!delVid) throw new ApiError(500 , "Error Occurred while deleting video");

        return "Thumbnail & Video Deleted"
    }
}

export default cloudinaryHandlingService;