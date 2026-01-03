import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
      index: true,
    },

    authorUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },

    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,   // null = main comment, not a reply
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    repliesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);