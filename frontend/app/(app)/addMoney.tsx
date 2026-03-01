import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import { setWallet, fetchWallet } from "@/src/redux/walletSlice";
import api from "@/src/utils/axios";
import RazorpayCheckout from "react-native-razorpay";

export default function AddMoneyScreen() {
  const [amount, setAmount] = useState("");
  const [err, setErr] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const wallet = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();

  // ✅ Load wallet
  useEffect(() => {
    const loadWallet = async () => {
      try {
        const data = await fetchWallet();
        dispatch(setWallet(data));
      } catch (e) {
        console.log("Wallet load error", e);
      }
    };

    loadWallet();
  }, []);

  const quickAmounts = [100, 200, 500, 1000];

  const selectAmount = (value: number) => {
    setAmount(value.toString());
    setSelected(value);
    setErr("");
  };

  // ✅ Validation + Add Money
  const addAmount = async () => {
    const value = Number(amount);
    if (!amount) {
      setErr("Please enter amount");
      return;
    }
    if (isNaN(value)) {
      setErr("Invalid amount");
      return;
    }
    if (value < 50) {
      setErr("Minimum add amount is ₹50");
      return;
    }
    if (value >= 25000) {
      setErr("Maximum add limit is ₹25,000");
      return;
    }
    // ✅ Passed
    setErr("");
    setIsLoading(true);
    try {
      setIsLoading(true);

      // 1️⃣ create order
      const orderRes = await api.post("/payment/order", {
        amount: value,
      });

      const order = orderRes.data;

      // 2️⃣ open razorpay
      const options = {
        description: "Add Money",
        currency: "INR",
        key: "rzp_test_SLMupJazwy2hey",
        amount: order.amount,
        order_id: order.id,
        name: "Dream11X",
        prefill: {
          email: "user@email.com",
        },
        theme: { color: "#22c55e" },
      };

      RazorpayCheckout.open(options)
        .then(async (payment: any) => {
          try {
            const verifyRes = await api.post("/payment/verify", {
              ...payment,
              amount: value,
            });

            dispatch(
              setWallet({
                deposit: verifyRes.data.wallet.deposit_balance,
                winning: verifyRes.data.wallet.winning_balance,
                bonus: verifyRes.data.wallet.bonus_balance,
                total:
                  verifyRes.data.wallet.deposit_balance +
                  verifyRes.data.wallet.winning_balance +
                  verifyRes.data.wallet.bonus_balance,
              }),
            );

            setAmount("");
          } catch (e) {
            setErr("Verification failed");
          } finally {
            setIsLoading(false); 
          }
        })
        .catch(() => {
          setErr("Payment cancelled");
          setIsLoading(false);
        });
    } catch (error) {
      setErr("Payment failed");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View className="flex-row items-center mx-5 mt-5">
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text className="text-xl font-bold ml-4">Add Money</Text>
        </View>

        {/* BALANCE CARD */}
        <View className="bg-green-100 flex-row mx-5 mt-6 p-4 rounded-xl shadow items-center">
          <MaterialIcons
            name="account-balance-wallet"
            size={40}
            color="green"
          />

          <View className="ml-3">
            <Text className="text-black text-lg font-semibold">
              Current Balance
            </Text>
            <Text className="text-green-900 text-xl font-bold">
              ₹ {wallet.total}
            </Text>
          </View>
        </View>

        {/* QUICK AMOUNT */}
        <View className="mx-5 mt-5">
          <Text className="font-semibold mb-3">Quick Add</Text>

          <View className="flex-row justify-between">
            {quickAmounts.map((item) => {
              const active = selected === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => selectAmount(item)}
                  className={`px-4 py-3 rounded-xl w-[22%] items-center ${
                    active ? "bg-green-500" : "bg-white border border-gray-300"
                  }`}
                >
                  <Text
                    className={`font-bold ${
                      active ? "text-white" : "text-black"
                    }`}
                  >
                    ₹{item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* INPUT */}
        <View className="mx-5 mt-5 bg-white rounded-xl border border-gray-300">
          <TextInput
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={(v) => {
              const clean = v.replace(/[^0-9]/g, "");
              setAmount(clean);
              setSelected(null);
              setErr("");
            }}
            className="p-5 text-lg"
          />
        </View>

        {/* ERROR */}
        {err ? (
          <Text className="text-red-500 mx-5 mt-2 font-medium">{err}</Text>
        ) : null}

        {/* INFO */}
        <View className="mx-5 mt-5 bg-white rounded-xl p-4">
          <View className="flex-row items-center mb-3">
            <Ionicons name="shield-checkmark" size={20} color="green" />
            <Text className="ml-3 text-gray-700">
              100% Safe & Secure Payments
            </Text>
          </View>

          <View className="flex-row items-center">
            <MaterialIcons name="payments" size={20} color="green" />
            <Text className="ml-3 text-gray-700">Fully usable in contests</Text>
          </View>
        </View>

        {/* ADD BUTTON */}
        <TouchableOpacity
          onPress={addAmount}
          disabled={isLoading}
          activeOpacity={0.8}
          className={`mx-5 mt-6 p-5 rounded-xl items-center flex-row justify-center ${
            isLoading ? "bg-green-400" : "bg-green-500"
          }`}
        >
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color="#fff" />
              <Text className="text-white text-lg font-bold ml-3">
                Processing...
              </Text>
            </>
          ) : (
            <Text className="text-white text-lg font-bold">
              ADD ₹{amount || 0}
            </Text>
          )}
        </TouchableOpacity>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
