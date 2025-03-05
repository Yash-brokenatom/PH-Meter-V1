import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const HistoryScreen = () => {
  const screenWidth = Dimensions.get("window").width;

  // Sample Data for Bar Chart
  const chartData = {
    labels: ["10", "11", "12", "13", "14"],
    datasets: [
      {
        data: [3, 10, 5, 6, 4],
      },
    ],
  };

  const pHRecords = [
    { date: "Monday, February 18, 2025", time: "12:33 PM", value: 5.5, color: "bg-lime-500" },
    { date: "Monday, February 12, 2025", time: "08:35 PM", value: 6, color: "bg-lime-500" },
    { date: "Monday, February 12, 2025", time: "07:05 AM", value: 2.8, color: "bg-orange-500" },
    { date: "Monday, January 27, 2025", time: "08:00 PM", value: 10, color: "bg-blue-500" },
    { date: "Monday, January 13, 2025", time: "07:05 AM", value: 2.8, color: "bg-orange-500" },
  ];

  return (
    <View className="flex-1 bg-white px-4 pt-4 justify-center  ">
      {/* Bar Chart */}
      <View className="top-24">
        <BarChart
        data={chartData}
        width={screenWidth - 20}
        height={400}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          color: () => "blue",
          labelColor: () => "black",
          barPercentage:1,
              }}
        showValuesOnTopOfBars
        style={{ marginTop: 10, alignSelf: "center" }}
      /></View>

      {/* pH Record List */}
      <ScrollView className="mt-4">
        {pHRecords.map((record, index) => (
          <View key={index} className={`mb-2 p-3 rounded-lg ${record.color} flex-row items-center`}>
            <View className="flex-1">
              <Text className="text-white font-semibold">{record.date}</Text>
              <Text className="text-white mt-1">{record.time}</Text>
            </View>
            <View className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
              <Text className="text-black font-semibold">{record.value}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="white" className="ml-2" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;
