import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
    index: true
  },

  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true
  },

  watchedAt: {
    type: Date,
    default: Date.now,
    index: true
  },

  watchCount : {
    type : Number,
    default : 1,
  }
},
{ timestamps: false }
);

/* One history entry per user per video */
historySchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const History = mongoose.model("History", historySchema);