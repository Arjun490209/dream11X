import { View, Text, FlatList } from "react-native";

const messages = [
  { id: "1", user: "Arjun", message: "Best of luck everyone!" },
  { id: "2", user: "Ravi", message: "India will win today 🔥" },
];

export default function Chat() {
  return (
    <View className="flex-1 bg-gray-100 p-4">

      <Text className="text-2xl font-bold mb-4">
        Contest Chat 💬
      </Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-3 mb-3 rounded-xl shadow">
            <Text className="font-bold text-blue-600">
              {item.user}
            </Text>
            <Text className="text-gray-700 mt-1">
              {item.message}
            </Text>
          </View>
        )}
      />
    </View>
  );
}