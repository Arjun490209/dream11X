import { View, Text, FlatList } from "react-native";

const rewards = [
  { id: "1", title: "1st Prize", amount: "₹10,00,000" },
  { id: "2", title: "2nd Prize", amount: "₹5,00,000" },
  { id: "3", title: "Top 10", amount: "₹50,000" },
];

export default function Rewards() {
  return (
    <View className="flex-1 bg-gray-100 p-4">

      <Text className="text-2xl font-bold mb-4">
        Prize Pool 🏆
      </Text>

      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-4 rounded-xl shadow">
            <Text className="text-lg font-bold">
              {item.title}
            </Text>
            <Text className="text-yellow-600 text-xl font-semibold mt-1">
              {item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}