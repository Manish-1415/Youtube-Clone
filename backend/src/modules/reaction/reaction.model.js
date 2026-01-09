import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true
  },

  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  targetType: {
    type: String,
    enum: ["video", "comment"],
    required: true
  },

  reaction: {
    type: String,
    enum: ["like", "dislike"],
    required: true
  }
},
{ timestamps: true }
);

/* 🚀 Prevent duplicate reactions */
reactionSchema.index(
  { userId: 1, targetId: 1, targetType: 1 },
  { unique: true }
);

export const Reaction = mongoose.model("Reaction", reactionSchema);