import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    league: { type: String, required: true },

    team1: { type: String, required: true },
    short1: { type: String, required: true },
    logo1: { type: String, required: true },

    team2: { type: String, required: true },
    short2: { type: String, required: true },
    logo2: { type: String, required: true },

    startTime: { type: Date, required: true },

    status: {
      type: String,
      enum: ["upcoming", "live", "completed", "abandoned"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchSchema);

export default Match;