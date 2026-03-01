import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/axios";


export const fetchWallet = async () => {
  const res = await api.get("/wallet");

  const data = res.data;

  return {
    deposit: data.wallet.deposit_balance,
    winning: data.wallet.winning_balance,
    bonus: data.wallet.bonus_balance,
    total: data.total_balance,
  };
};


interface WalletState {
  deposit: number;
  winning: number;
  bonus: number;
  total: number;
}

const initialState: WalletState = {
  deposit: 0,
  winning: 0,
  bonus: 0,
  total: 0,
};
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<WalletState>) => {
      state.deposit = action.payload.deposit;
      state.winning = action.payload.winning;
      state.bonus = action.payload.bonus;
      state.total = action.payload.total;
    },
    resetWallet: () => initialState,
  },
});

export const { setWallet, resetWallet } = walletSlice.actions;
export default walletSlice.reducer;