import jwt from "jsonwebtoken";
<<<<<<< HEAD
import User from "../models/User.model.js";
=======
import User from "../models/User.model.js"
>>>>>>> 9f0f5198a58cf50052cebe757dd78b85fe1f3b40

const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Authorization header check
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2️⃣ Token extract
    const token = authHeader.split(" ")[1];

    // 3️⃣ Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ User find from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 5️⃣ Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or Expired Token",
      error: error.message,
    });
  }
};

export default authMiddleware;
