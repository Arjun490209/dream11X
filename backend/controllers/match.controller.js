import Match from "../models/Match.js";

// ✅ Create Match (Team Add Karega)
const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json({
      success: true,
      message: "Match Created Successfully",
      data: match,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 });
    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get Single Match
const getSingleMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match)
      return res.status(404).json({ success: false, message: "Match Not Found" });

    res.json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Update Match
const updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Match Updated Successfully",
      data: match,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Delete Match
const deleteMatch = async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Match Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default {
  createMatch,
  getAllMatches,
  getSingleMatch,
  updateMatch,
  deleteMatch,
}