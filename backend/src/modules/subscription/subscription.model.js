import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriberUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate subscriptions
subscriptionSchema.index(
  { subscriberUserId: 1, channelId: 1 },
  { unique: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
