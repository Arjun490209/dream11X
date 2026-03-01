import Contest from "../models/Contest.js";
import User from "../models/User.model.js"


const joinContest = async (req, res) => {
  try {
    const { contestId } = req.body;
    const userId = req.user._id;

    const contest = await Contest.findById(contestId);
    if (!contest)
      return res.status(404).json({ message: "Contest not found" });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Contest closed check
    if (contest.status !== "open")
      return res.status(400).json({ message: "Contest closed" });

    // Full check
    if (contest.filledSpots >= contest.totalSpots)
      return res.status(400).json({ message: "Contest Full" });

    // Duplicate join prevent
    const alreadyJoined = contest.joinedUsers.find(
      (u) => u.user.toString() === userId.toString()
    );

    if (alreadyJoined)
      return res.status(400).json({ message: "Already Joined" });

    // Wallet check
    if (user.walletBalance < contest.entryFee)
      return res.status(400).json({ message: "Insufficient Balance" });

    // Deduct balance
    user.walletBalance -= contest.entryFee;
    await user.save();

    // Add user
    contest.filledSpots += 1;
    contest.joinedUsers.push({ user: userId });

    // Auto close contest
    if (contest.filledSpots === contest.totalSpots) {
      contest.status = "closed";
    }

    await contest.save();

    res.json({
      success: true,
      message: "Contest Joined Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  joinContest
}