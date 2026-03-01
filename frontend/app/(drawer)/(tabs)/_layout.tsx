import { Tabs, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../../../assets/images/logo.png";

export default function AppLayout() {
  const navigation = useNavigation<any>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        header: () => (
          <SafeAreaView
            edges={["top"]}
            style={{ backgroundColor: "#1e40af" }} // ✅ BG color
          >
            <LinearGradient
               colors={["#0ea5e9", "#6366f1", "#a855f7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                paddingVertical: 1,
                backgroundColor: "#6A666B", // fallback bg
              }}
            >
              <View className="flex-row items-center justify-between px-4">
                {/* Profile Icon */}
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons
                    name="person-circle-outline"
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>

                {/* Logo */}
                <View className="flex-1 items-center">
                  <Image
                    source={logo}
                    style={{ width: 260, height: 80 }}
                    resizeMode="contain"
                  />
                </View>

                {/* Add Button */}
                <TouchableOpacity
                  onPress={() => router.push("/(app)/addMoney")}
                >
                  <Ionicons name="add-circle-outline" size={35} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </SafeAreaView>
        ),

        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",

        tabBarStyle: {
          backgroundColor: "#ffffff", // ✅ tab bar bg color
          height: 40 + insets.bottom,
          paddingBottom: insets.bottom,
          borderTopWidth: 0,
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="myMatches"
        options={{
          title: "My Match",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="reward"
        options={{
          title: "Reward",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="winners"
        options={{
          title: "Winners",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
