import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useEffect } from "react";
import api from "@/src/utils/axios";
import { setWallet } from "@/src/redux/walletSlice";

export default function Wallet() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const wallet = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
const token = useAppSelector((state) => state.auth.token);


 useEffect(() => {
  if (!token) return;

  const fetchWallet = async () => {
    try {
      const res = await api.get("/wallet");

      dispatch(
        setWallet({
          deposit: res.data.wallet.deposit_balance,
          winning: res.data.wallet.winning_balance,
          bonus: res.data.wallet.bonus_balance,
          total: res.data.total_balance,
        })
      );
    } catch (error) {
      console.log("Wallet fetch error:", error);
    }
  };

  fetchWallet();
}, [token]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center mx-5 mt-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold ml-4">My Balance</Text>
        </View>

        {/* Balance Card */}
        <View className="bg-green-100 flex-row justify-between gap-2 mx-5 mt-6 p-4 rounded-xl shadow items-center">
          <View className=" flex-row gap-2 ">
            <MaterialIcons
              name="account-balance-wallet"
              className="border border-green-200"
              size={40}
              color="green"
            />
            <View>
              <Text className="text-black text-lg font-semibold">
                Current Balance
              </Text>
              <Text className="text-green-900 text-xl font-bold ">₹ {wallet.total}</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-green-500 flex-row gap-2 items-center py-2 px-4 rounded-xl mb-4">
            <MaterialIcons name="add-circle" size={20} color="white" />
            <Text className="text-white text-center font-bold">Add Money</Text>
          </TouchableOpacity>
        </View>

        {/*  Withdraw Buttons */}
        <View className="mx-5 bg-white mt-4 p-4 flex-row justify-between items-center rounded">
          <View>
            <Text className="text-gray-600">Winnings Amount</Text>
            <Text className="text-xl font-bold">₹ {wallet.winning}</Text>
          </View>

          {user?.isVerified ? (
            <TouchableOpacity className="bg-gray-50 border border-gray-300 px-8 py-2 rounded-xl">
              <Text className="text-black text-center font-bold">Withdraw</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="bg-gray-50 border border-gray-300 px-8 py-2 rounded-xl">
              <Text className="text-black text-center font-bold">
                Complete KYC
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Transactions */}
        <TouchableOpacity
          onPress={() => {}}
          className="mx-5 mt-4 bg-white p-4 rounded-xl flex-row justify-between items-center"
        >
          <View className="flex-row items-center gap-3">
            <Ionicons name="receipt-outline" size={22} color="#374151" />

            <View>
              <Text className="font-semibold text-base">My Transactions</Text>
              <Text className="text-gray-500 text-sm">
                Review last 6 months transactions
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* KYC Details */}
        <TouchableOpacity className="mx-5 mt-4 bg-white p-4 rounded-xl flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color="#374151"
            />

            <View>
              <Text className="font-semibold text-base">My KYC Details</Text>
              <Text className="text-gray-500 text-sm">
                View mobile, email, PAN & bank a/c
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
