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

    deleteThumbnail : async (payload) => {
        const delThumb = await cloudinary.uploader.destroy(payload.thumbnialPublicId);

        if(!delThumb) throw new ApiError(500 , "Error Occurred while deleting thumbnail");

        return delThumb;
    },

    deleteVideoAndThumb : async (payload) => {
        const delVid = await cloudinary.uploader.destroy(payload.videoPublicId);

        if(!delVid) throw new ApiError(500 , "Error Occurred while deleting video")

        const delThumb = await cloudinary.uploader.destroy(payload.thumbnialPublicId);

        if(!delThumb) throw new ApiError(500 , "Error Occurred while deleting thumbnail");

        return {delVid , delThumb}
    }
}

export default cloudinaryHandlingService;