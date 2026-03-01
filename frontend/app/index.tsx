import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../src/utils/secureStore";
import { useAppDispatch } from "../src/redux/hooks";
import { setTokenOnly } from "../src/redux/authSlice";

export default function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();

      if (token) {
        dispatch(setTokenOnly(token));
        router.replace("/(drawer)/(tabs)/home");
      } else {
        router.replace("/(auth)/login");
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}