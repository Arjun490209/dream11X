import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { logoutUser, setCredentials } from "../../src/redux/authSlice";
import { deleteToken } from "../../src/utils/secureStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import api from "@/src/utils/axios";
import { SafeAreaView } from "react-native-safe-area-context";

function CustomDrawerContent(props: any) {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) return;

        setLoading(true);
        const res = await api.get("/user/me");

        dispatch(
          setCredentials({
            user: res.data.data,
            token: token || "",
          }),
        );
      } catch (error: any) {
        console.log(error?.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await deleteToken();
    dispatch(logoutUser());
    router.replace("/(auth)/login");
  };

  return (
    <LinearGradient  colors={["#0ea5e9", "#6366f1", "#a855f7"]} className="flex-1 p-5">
      <SafeAreaView>
        {/* 👤 Profile Header */}
        <View className="items-start">
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <TouchableOpacity
                onPress={() => router.push("/profile")}
                activeOpacity={0.8}
                className="flex-row items-center py-3"
              >
                {/* 👤 Left Profile Section */}
                <View className="flex-row items-center gap-3 flex-1">
                  <Image
                    source={{
                      uri:
                        user?.profileImage || "https://i.pravatar.cc/150?img=3",
                    }}
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />

                  <View className="flex-1">
                    <Text className="text-white text-2xl capitalize font-bold">
                      {user?.name || "Player"}
                    </Text>
                    <Text className="text-white/80 text-sm">{user?.email}</Text>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={22} color="white" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* 💰 Wallet Section */}
        <View className="bg-white/20 p-4 rounded-xl mt-4 space-y-4">
          {/* 💰 My Balance */}
          <TouchableOpacity
            onPress={() => router.push("/wallet")}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-5">
              <Ionicons name="wallet-outline" size={22} color="white" />
              <Text className="text-white text-lg font-semibold">
                My Balance
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          <View className="h-[1px] my-1.5 bg-white/40" />

          {/* 🎟 My Vouchers */}
          <TouchableOpacity
            onPress={() => router.push("/vouchers")}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-5">
              <Ionicons name="ticket-outline" size={22} color="white" />
              <Text className="text-white text-lg font-semibold">
                My Vouchers
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="bg-white/20 p-4 rounded-xl my-2 space-y-4">
          {/* 👤 My Info & Settings */}
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-5">
              <Ionicons name="person-outline" size={22} color="white" />
              <Text className="text-white text-lg font-semibold">
                My Info & Settings
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          <View className="h-[1px] my-1.5 bg-white/40" />

          {/* 💳 How to Pay */}
          <TouchableOpacity
            onPress={() => router.push("/how-to-pay")}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-5">
              <Ionicons name="card-outline" size={22} color="white" />
              <Text className="text-white text-lg font-semibold">
                How to Pay
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          <View className="h-[1px] my-1.5 bg-white/40" />

          {/* ➕ More */}
          <TouchableOpacity
            onPress={() => router.push("/more")}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-5">
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={22}
                color="white"
              />
              <Text className="text-white text-lg font-semibold">More</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* 🚪 Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mt-auto bg-red-500 p-4 rounded-xl"
        >
          <Text className="text-white text-center font-bold">Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="wallet"
        options={{
          drawerLabel: "Wallet",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
