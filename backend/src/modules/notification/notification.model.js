import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // The channel who receives the notification (owner of content)
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
      index: true,
    },

    // The user who performed the action (actor)
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The type of action
    type: {
      type: String,
      required: true,
      enum: ["LIKE", "DISLIKE", "COMMENT", "SUBSCRIBE"],
    },

    // The object that was acted on
    targetType: {
      type: String,
      required: true,
      enum: ["VIDEO", "COMMENT", "REACTION", "CHANNEL"],
    },

    // The exact item that was acted on (videoId, commentId, reactionId, channelId)
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // Human-readable message, can be generated from type + targetType
    message: {
      type: String,
      required: true,
    },

    // Whether the user has seen it
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // createdAt + updatedAt
);

export const Notification = mongoose.model("Notification", notificationSchema);