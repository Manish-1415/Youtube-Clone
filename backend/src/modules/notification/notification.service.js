import ApiError from "../../utility/ApiError";
import { Notification } from "./notification.model";

const notificationService = {
    createNotification : async (payload) => {
        const notification = await Notification.create(payload);

        if(!notification) throw new ApiError(500 , "Error Occurred While Creating Notification");

        return "Everything Exectued Perfectly..."
    },
}


export default notificationService;