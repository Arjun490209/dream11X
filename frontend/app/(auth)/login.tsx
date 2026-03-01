import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../src/redux/hooks";
import { setCredentials } from "../../src/redux/authSlice";
import { saveToken } from "../../src/utils/secureStore";
import api from "../../src/utils/axios";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const { token, user } = res.data;

      await saveToken(token);
      dispatch(setCredentials({ token, user }));

      router.replace("/(drawer)/(tabs)/home");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">

        <Text className="text-3xl font-bold mb-8">Login</Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        />

        {/* Password */}
        <View className="w-full border border-gray-300 rounded-lg flex-row items-center px-4 mb-6">
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            className="flex-1 py-4"
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Text className="text-blue-500 font-semibold">
              {secureText ? "Show" : "Hide"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-blue-600 py-4 rounded-lg"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Login
          </Text>
        </TouchableOpacity>

        {/* Switch to Signup */}
        <TouchableOpacity
          className="mt-6"
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text className="text-gray-600">
            Don’t have an account?{" "}
            <Text className="text-blue-600 font-semibold">Signup</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}