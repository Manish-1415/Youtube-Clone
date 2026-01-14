import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    ownerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      unique: true, // one user = one channel
    },

    channelName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    avatar: {
      type: {
        url : {type : String , required : true},
        path : {type : String , required : true},
      },
    },

    subscribersCount: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

export const Channel = mongoose.model("Channel", channelSchema);
