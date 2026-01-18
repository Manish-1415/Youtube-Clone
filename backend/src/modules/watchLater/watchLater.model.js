import mongoose from "mongoose";

const watchLaterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },

    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  { timestamps: true }
);

/* 🚀 Prevent same video being added twice by same user */
watchLaterSchema.index(
  { userId: 1, videoId: 1 },
  { unique: true }
);

export const WatchLater = mongoose.model("WatchLater", watchLaterSchema);
