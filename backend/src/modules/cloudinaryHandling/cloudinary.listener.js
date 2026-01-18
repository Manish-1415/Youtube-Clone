import eventBus from "../../eventBus/index.js"
import cloudinaryHandlingService from "./cloudinary.service.js"

eventBus.on("CLOUDINARY_PROFILE_DELETE" , async(payload) => {
    const deleteFile = await cloudinaryHandlingService.deleteFile(payload);
})

eventBus.on("CLOUDINARY_THUMBNAIL_DELETE" , async(payload) => {
    const deleteThumb = await cloudinaryHandlingService.deleteThumbnail(payload);
})

eventBus.on("CLOUDINARY_VIDEO_THUMB_DELETE" , async(payload) => {
    const deleteVid = await cloudinaryHandlingService.deleteVideoAndThumb(payload);
})