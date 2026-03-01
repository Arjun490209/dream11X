import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState, useRef } from "react";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";

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
  userTeamCreated: boolean;
}

const dummyMatches: Match[] = [
  {
    _id: "1",
    league: "IPL 2025",
    team1: "India",
    short1: "IND",
    logo1: "https://i.pravatar.cc/100?img=1",
    team2: "Australia",
    short2: "AUS",
    logo2: "https://i.pravatar.cc/100?img=2",
    startTime: new Date().toISOString(),
    status: "upcoming",
    prize: "₹10 Lakhs",
    userTeamCreated: true,
  },
  {
    _id: "2",
    league: "World Cup",
    team1: "England",
    short1: "ENG",
    logo1: "https://i.pravatar.cc/100?img=3",
    team2: "Pakistan",
    short2: "PAK",
    logo2: "https://i.pravatar.cc/100?img=4",
    startTime: new Date().toISOString(),
    status: "live",
    prize: "₹5 Lakhs",
    userTeamCreated: true,
  },
  {
    _id: "3",
    league: "IPL Finals",
    team1: "RCB",
    short1: "RCB",
    logo1: "https://i.pravatar.cc/100?img=5",
    team2: "MI",
    short2: "MI",
    logo2: "https://i.pravatar.cc/100?img=6",
    startTime: new Date().toISOString(),
    status: "completed",
    prize: "₹8 Lakhs",
    userTeamCreated: true,
  },
];

const tabs = ["upcoming", "live", "completed"] as const;

export default function MyMatches() {
  const router = useRouter();
  const pagerRef = useRef<PagerView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderMatches = (status: typeof tabs[number]) => {
    const filtered = dummyMatches.filter(
      (match) =>
        match.status === status && match.userTeamCreated
    );

    if (filtered.length === 0) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">
            No Matches Found
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/contest",
                params: { id: item._id },
              })
            }
            className="bg-white border border-gray-300 mx-4 mb-6 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* League */}
            <View className="bg-gray-100 py-2">
              <Text className="px-4 text-gray-900">
                {item.league}
              </Text>
            </View>

            <View className="py-3">
              <View className="flex-row justify-around items-center">

                {/* Left Team */}
                <View className="items-center flex-1">
                  <View className="flex-row items-center gap-2 py-2">
                    <Image
                      source={{ uri: item.logo1 }}
                      className="w-14 h-14 rounded-full"
                    />
                    <Text className="text-xl font-bold">
                      {item.short1}
                    </Text>
                  </View>
                  <Text className="text-gray-500 text-xs">
                    {item.team1}
                  </Text>
                </View>

                {/* Status */}
                <View className="items-center flex-1">
                  <View className="bg-blue-50 rounded-full px-3 py-2">
                    <Text className="text-blue-600 font-bold capitalize">
                      {item.status}
                    </Text>
                  </View>
                </View>

                {/* Right Team */}
                <View className="items-center flex-1">
                  <View className="flex-row items-center gap-2 py-2">
                    <Text className="text-xl font-bold">
                      {item.short2}
                    </Text>
                    <Image
                      source={{ uri: item.logo2 }}
                      className="w-14 h-14 rounded-full"
                    />
                  </View>
                  <Text className="text-gray-500 text-xs">
                    {item.team2}
                  </Text>
                </View>
              </View>

              {/* Prize */}
              <View className="mt-4 border-t border-gray-200 py-2 px-3">
                <Text className="text-[#8b6107] font-bold text-lg">
                  MEGA {item.prize}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View className="flex-1 bg-gray-100">

      {/* Top Tabs */}
      <View className="flex-row bg-white p-2 justify-around">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setActiveIndex(index);
              pagerRef.current?.setPage(index);
            }}
            className={`px-4 py-2 rounded-full ${
              activeIndex === index
                ? "bg-blue-600"
                : "bg-gray-200"
            }`}
          >
            <Text
              className={`capitalize font-semibold ${
                activeIndex === index
                  ? "text-white"
                  : "text-black"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Swipe View */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) =>
          setActiveIndex(e.nativeEvent.position)
        }
      >
        {tabs.map((tab) => (
          <View key={tab} className="flex-1">
            {renderMatches(tab)}
          </View>
        ))}
      </PagerView>
    </View>
  );
}