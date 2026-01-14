import eventBus from "../../eventBus/index.js"
import cloudinaryHandlingService from "./cloudinary.service.js"

eventBus.on("CLOUDINARY_PROFILE_DELETE" , async(payload) => {
    const deleteFile = await cloudinaryHandlingService.deleteFile(payload);
})

eventBus.on("CLOUDINARY_THUMB_VIDEO_DELETE" , async(payload) => {
    const deleteFiles = await cloudinaryHandlingService.deleteThumbnailAndVideo(payload);
})