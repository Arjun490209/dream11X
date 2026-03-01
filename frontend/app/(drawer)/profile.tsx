import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "../../src/redux/hooks";
import { logoutUser } from "../../src/redux/authSlice";
import { deleteToken, getToken } from "../../src/utils/secureStore";
import { useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import api from "@/src/utils/axios";
import { useFocusEffect } from "@react-navigation/native";


export default function Profile() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

useFocusEffect(
  useCallback(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const token = await getToken();

        const res = await api.get("/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data.data);
      } catch (error: any) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, [])
);


  const handleLogout = async () => {
    await deleteToken();
    dispatch(logoutUser());
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="items-center mt-10">
        <Image
          source={{
            uri:
              userData?.profileImage ||
              "https://i.pravatar.cc/150?img=12",
          }}
          className="w-32 h-32 rounded-full"
        />

        <Text className="text-2xl font-bold mt-4">
          {userData?.name}
        </Text>

        <Text className="text-gray-500 mt-1">
          {userData?.email}
        </Text>
      </View>

      <View className="mt-10 mx-6">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 py-4 rounded-xl"
        >
          <Text className="text-white text-center font-bold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}