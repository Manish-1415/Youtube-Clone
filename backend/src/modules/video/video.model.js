import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },

    video: {
      url: { type: String, required: true },   // public CDN url
      path: { type: String, required: true },  // internal storage path
    },

    thumbnail: {
      url: { type: String, required: true },
      path: { type: String, required: true },
    },

    duration: {
      type: Number, // seconds
      required: true,
    },

    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    tags: [String],

    views: {
      type: Number,
      default: 0,
    },

    ownerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      default: null, // channel comes later
    },
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);
