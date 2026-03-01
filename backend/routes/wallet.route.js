import express from "express"
import walletController from "../controllers/wallet.controller.js";
import auth from "../middleware/auth.middleware.js"

const walletRouter = express.Router()

walletRouter.get("/", auth , walletController.getWallet)
walletRouter.post("/winning", auth , walletController.winning)
walletRouter.post("/withdraw", auth , walletController.withdraw)


export default walletRouter;