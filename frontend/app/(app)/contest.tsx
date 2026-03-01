import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Contest {
  _id: string;
  prizePool: number;
  entryFee: number;
  totalSpots: number;
  filledSpots: number;
  status: "open" | "closed" | "completed";
}

export default function ContestScreen() {
  const [contests] = useState<Contest[]>([
    {
      _id: "1",
      prizePool: 2000000,
      entryFee: 99,
      totalSpots: 20000,
      filledSpots: 1680,
      status: "open",
    },
    {
      _id: "2",
      prizePool: 500000,
      entryFee: 49,
      totalSpots: 10000,
      filledSpots: 10000,
      status: "closed",
    },
    {
      _id: "3",
      prizePool: 100000,
      entryFee: 25,
      totalSpots: 5000,
      filledSpots: 1200,
      status: "open",
    },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-4 py-4">
        {contests.map((contest) => {
          const spotsLeft = contest.totalSpots - contest.filledSpots;
          const percent =
            (contest.filledSpots / contest.totalSpots) * 100;

          return (
            <View
              key={contest._id}
              className="bg-white rounded-2xl p-4 mb-5 shadow-md"
            >
              {/* Prize + Entry Row */}
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-green-600">
                  ₹{contest.prizePool.toLocaleString()}
                </Text>
                <Text className="text-gray-500 text-sm">
                  Entry ₹{contest.entryFee}
                </Text>
              </View>

              {/* Progress Bar */}
              <View className="mt-4">
                <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <View
                    style={{ width: `${percent}%` }}
                    className="bg-green-500 h-full"
                  />
                </View>

                <View className="flex-row justify-between mt-2">
                  <Text className="text-xs text-gray-400">
                    {spotsLeft.toLocaleString()} Spots Left
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {contest.totalSpots.toLocaleString()} Total
                  </Text>
                </View>
              </View>

              {/* Join Button */}
              <TouchableOpacity
                className={`mt-4 py-3 rounded-xl ${
                  contest.status === "open"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
                disabled={contest.status !== "open"}
                onPress={() =>
                  console.log("Join Contest:", contest._id)
                }
              >
                <Text className="text-white text-center font-bold">
                  {contest.status === "open"
                    ? "JOIN NOW"
                    : "CLOSED"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}