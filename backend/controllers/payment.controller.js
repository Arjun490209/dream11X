import razorpay from "../config/razorpay.js";
import crypto from "crypto";

// ✅ CREATE ORDER
const createOrder =async (req, res) => {
  try {
    let { amount } = req.body;

    amount = Number(amount);

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    if (amount < 50 || amount > 25000) {
      return res.status(400).json({
        message: "Amount must be ₹50–₹25,000",
      });
    }

    // ✅ Create Razorpay Order
    const options = {
      amount: amount * 100, // paisa
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.log("Create order error:", error);
    res.status(500).json({
      message: "Order creation failed",
    });
  }
};


const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    const userId = req.user.id;

    let wallet = await Wallet.findOne({ user_id: userId });

    if (!wallet) {
      wallet = await Wallet.create({
        user_id: userId,
        deposit_balance: 0,
        winning_balance: 0,
        bonus_balance: 0,
      });
    }

    // ✅ ADD MONEY ONLY AFTER VERIFY
    wallet.deposit_balance =
      Number(wallet.deposit_balance || 0) + Number(amount);

    await wallet.save();

    await Transaction.create({
      user_id: userId,
      type: "deposit",
      amount,
      status: "success",
      payment_id: razorpay_payment_id,
    });

    res.json({
      success: true,
      wallet,
      total_balance:
        wallet.deposit_balance +
        wallet.winning_balance +
        wallet.bonus_balance,
    });

  } catch (error) {
    console.log("Verify error:", error);
    res.status(500).json({
      message: "Verification failed",
    });
  }
};


export default {
  createOrder,
  verifyPayment
};