import Wallet from "../models/Wallet.model.js";
import Transaction from "../models/WalletTransaction.js";

// const depositController = async (req, res) => {
//    try {
//     let { amount } = req.body;

//     amount = Number(amount);
//     if (!amount || isNaN(amount)) {
//       return res.status(400).json({
//         message: "Amount must be a number",
//       });
//     }

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ message: "Invalid amount" });
//     }

//     const userId = req.user.id;

//     // Wallet find 
//     let wallet = await Wallet.findOne({ user_id: userId });

//     if (!wallet) {
//       wallet = await Wallet.create({
//         user_id: userId,
//       });
//     }

//     // Deposit balance increase karo
//      wallet.deposit_balance = Number(wallet.deposit_balance) + amount;

//     await wallet.save();

//     // Transaction create karo
//     await Transaction.create({
//       user_id: userId,
//       type: "deposit",
//       amount,
//       status: "success",
//     });

//     res.json({
//       message: "Deposit Successful",
//       wallet,
//       total_balance:
//         wallet.deposit_balance +
//         wallet.winning_balance +
//         wallet.bonus_balance,
//     })

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// }



const winning = async (req, res) => {
  const { userId, amount } = req.body;

  let wallet = await Wallet.findOne({ user_id: userId });

  if (!wallet) {
    wallet = await Wallet.create({ user_id: userId });
  }

  wallet.winning_balance += amount;
  await wallet.save();

  await Transaction.create({
    userId,
    type: "winning",
    amount,
  });

  res.json({ message: "Winning Credited", wallet });
}


const withdraw = async (req, res) => {
  const { amount } = req.body;

  const wallet = await Wallet.findOne({ user_id: req.user.id });

  if (!wallet || wallet.winning_balance < amount) {
    return res.status(400).json({
      message: "Insufficient Winning Balance",
    });
  }

  wallet.winning_balance -= amount;
  await wallet.save();

  await Transaction.create({
    userId: req.user.id,
    type: "withdraw",
    amount,
  });

  res.json({ message: "Withdraw Successful", wallet });
}


const getWallet = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ user_id: req.user.id });

    // 🆕 Agar wallet exist nahi karta to create karo
    if (!wallet) {
      wallet = await Wallet.create({
        user_id: req.user.id,
      });
    }

    const total =
      wallet.deposit_balance +
      wallet.winning_balance +
      wallet.bonus_balance;

    res.json({
      wallet: {
        deposit_balance: wallet.deposit_balance,
        winning_balance: wallet.winning_balance,
        bonus_balance: wallet.bonus_balance,
      },
      total_balance: total,
    });

  } catch (error) {
    console.log("Get Wallet Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export default {
    winning,
    withdraw,
    getWallet
}