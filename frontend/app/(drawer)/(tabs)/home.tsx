import api from "@/src/utils/axios";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

interface Match {
  _id: string;
  league: string;
  team1: string;
  short1: string;
  logo1: string;
  team2: string;
  short2: string;
  logo2: string;
  startTime: string;
  status: "upcoming" | "live" | "completed";
  prize?: string;
  spots?: string;
}

export default function Home() {
  const router = useRouter();
  const [allMatch, setAllMatch] = useState<Match[]>([]);

  const calculateTimeLeft = (startTime: string) => {
    const now = Date.now();
    const matchTime = new Date(startTime).getTime();
    const diff = matchTime - now;

    if (diff <= 0) return "Starting Soon";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;

    return `${seconds}s`;
  };

  useEffect(() => {
    const getAllMatch = async () => {
      try {
        const response = await api.get("/match");
        const rawMatches: Match[] = response.data?.data || [];

        // 🔥 Remove duplicate matches by _id
        const uniqueMatches = Array.from(
          new Map(rawMatches.map((m) => [m._id, m])).values()
        );

        setAllMatch(uniqueMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    getAllMatch();
  }, []);

  const upcomingMatches = allMatch
    .filter((match) => match.status === "upcoming")
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() -
        new Date(b.startTime).getTime()
    );

  return (
    <ScrollView className="flex-1 py-2" showsVerticalScrollIndicator={false}>
      
      {/* Banner */}
      <View className="mx-4 mt-4 rounded-2xl overflow-hidden shadow-lg">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
          }}
          className="w-full h-40"
        />
        <View className="absolute bottom-0 w-full bg-black/60 p-4">
          <Text className="text-white text-xl font-bold">
            Play & Win Big Prizes 🏆
          </Text>
        </View>
      </View>

      <Text className="text-2xl font-bold mx-4 mt-6 mb-4">
        Upcoming Matches
      </Text>

      {upcomingMatches.map((match) => (
        <TouchableOpacity
          key={match._id}
          activeOpacity={0.9}
          onPress={() =>
            router.push({
              pathname: "/contest",
              params: { id: match._id },
            })
          }
          className="bg-white border border-gray-300 mx-4 mb-6 rounded-2xl shadow-lg overflow-hidden"
        >
          {/* League Strip */}
          <View className="bg-gray-100 py-2">
            <Text className="px-4 text-gray-900">
              {match.league}
            </Text>
          </View>

          <View className="py-2">
            {/* Teams */}
            <View className="flex-row justify-around items-center">

              {/* Team 1 */}
              <View className="items-center flex-1">
                <View className="flex-row items-center space-x-2 py-2">
                  <Image
                    source={{ uri: match.logo1 }}
                    className="w-14 h-14 rounded-full"
                    resizeMode="contain"
                  />
                  <Text className="text-xl font-bold">
                    {match.short1}
                  </Text>
                </View>
                <Text className="text-gray-500 text-xs">
                  {match.team1}
                </Text>
              </View>

              {/* Timer */}
              <View className="items-center flex-1">
                <View className="bg-red-50 rounded-full px-3 py-2">
                  <Text
                    className={`font-bold text-sm ${
                      calculateTimeLeft(match.startTime).includes("m")
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  >
                    {calculateTimeLeft(match.startTime)}
                  </Text>
                </View>

                <Text className="text-gray-800 text-base mt-2">
                  {new Date(match.startTime).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Text>
              </View>

              {/* Team 2 */}
              <View className="items-center flex-1">
                <View className="flex-row items-center space-x-2 py-2">
                  <Text className="text-xl font-bold">
                    {match.short2}
                  </Text>
                  <Image
                    source={{ uri: match.logo2 }}
                    className="w-14 h-14 rounded-full"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-gray-500 text-xs">
                  {match.team2}
                </Text>
              </View>
            </View>

            {/* Prize */}
            <View className="mt-5 border-t border-gray-200 py-2 px-4">
              <Text className="text-[#8b6107] font-bold text-lg">
                MEGA {match.prize ?? "₹0"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}