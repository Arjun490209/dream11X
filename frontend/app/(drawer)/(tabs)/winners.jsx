import { View, Text, FlatList } from "react-native";

const winners = [
  { id: "1", name: "Arjun", amount: "₹10,00,000", rank: 1 },
  { id: "2", name: "Ravi", amount: "₹5,00,000", rank: 2 },
  { id: "3", name: "Amit", amount: "₹50,000", rank: 3 },
];

export default function Winners() {
  return (
    <View className="flex-1 bg-gray-100 p-4">

      <Text className="text-2xl font-bold mb-4">
        Winners 🏆
      </Text>

      <FlatList
        data={winners}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-4 rounded-xl shadow flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-bold">
                #{item.rank} {item.name}
              </Text>
              <Text className="text-gray-500">
                Prize Winner
              </Text>
            </View>

            <Text className="text-green-600 font-bold text-lg">
              {item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}