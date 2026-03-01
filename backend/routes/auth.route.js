import express from "express";
import authController from "../controllers/auth.controller.js";
import contestController from "../controllers/contest.controller.js";
import auth from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", authController.loginController);
authRouter.post("/signup", authController.signupController);


authRouter.post("/join", auth, contestController.joinContest);

export default authRouter;