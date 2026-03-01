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

export default function SignupScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        name,
        email,
        phone,
        password,
      });

      const { token, user } = res.data;

      await saveToken(token);
      dispatch(setCredentials({ token, user }));

      router.replace("/(drawer)/(tabs)/home");

    } catch (error: any) {
      Alert.alert(
        "Signup Failed",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">

        <Text className="text-3xl font-bold mb-8">Signup</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        />

        <TextInput
          placeholder="Phone (Optional)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        />

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

        <TouchableOpacity
          onPress={handleSignup}
          className="w-full bg-blue-600 py-4 rounded-lg"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Signup
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-6"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text className="text-gray-600">
            Already have an account?{" "}
            <Text className="text-blue-600 font-semibold">Login</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}