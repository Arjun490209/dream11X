import express from "express";
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import connectDB from "./config/db.js";
import matchRoutes from "./routes/match.routes.js"
import userRouter from "./routes/user.route.js";
import walletRouter from "./routes/wallet.route.js";
import payRouter from "./routes/payment.routes.js";


const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World")
})
app.use("/api/auth", authRouter);
app.use("/api/match", matchRoutes);
app.use("/api/user", userRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/payment", payRouter);

app.listen(PORT, async () => {
    console.log(`server running port : ${PORT}`)
    await connectDB();
})