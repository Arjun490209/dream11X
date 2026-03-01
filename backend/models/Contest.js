import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },

    prizePool: {
      type: Number,
      required: true,
    },

    entryFee: {
      type: Number,
      required: true,
    },

    totalSpots: {
      type: Number,
      required: true,
    },

    filledSpots: {
      type: Number,
      default: 0,
    },

    joinedUsers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],

    status: {
      type: String,
      enum: ["open", "closed", "completed"],
      default: "open",
    },
  },
  { timestamps: true }
);

 const Contest = mongoose.model("Contest", contestSchema)
 export default Contest;