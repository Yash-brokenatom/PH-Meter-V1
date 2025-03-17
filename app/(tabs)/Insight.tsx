import React, { useState, useEffect, useMemo } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-gifted-charts";
import AddModal from "@/components/Modal";
import { setupDatabase, fetchRecords, insertRecord } from "@/Database/Database"; // Import database functions

export default function Insight() {
  const [list, setList] = useState<any[]>([]);
  const [selectedBar, setSelectedBar] = useState<number | null>(null);

  useEffect(() => {
    setupDatabase();
    fetchRecords(setList);
  }, []);

  const handleAddRecord = async (ph: number) => {
    const dateTime = new Date().toISOString();
    await insertRecord(ph, dateTime);
    fetchRecords(setList);

  };

  const sortedList = useMemo(() => {
    return [...list].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  }, [list]);

  const barData = useMemo(() => {
    return list.map((item, index) => ({
      value: item.ph,
      label: new Date(item.dateTime).getDate().toString(),
      frontColor:
        item.ph <= 4.5 ? "#FF9359" : item.ph > 4.5 && item.ph < 7.5 ? "#B1C644" : "#007FAA",
      onPress: () => setSelectedBar(index),
      topLabelComponent: selectedBar === index ? () => (
        <View style={{
          position: "absolute", backgroundColor: "white", borderRadius: 5, padding: 2,
          shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25,
          shadowRadius: 3.84, elevation: 5, width: 50, alignItems: "center"
        }}>
          <Text style={{ color: "#344BFD", fontSize: 10, fontWeight: "400" }}>
            {new Date(item.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </View>
      ) : undefined,
    }));
  }, [list, selectedBar]);

  return (
    <SafeAreaView className="h-full w-full gap-8 bg-white">
      <View className="flex-row justify-end items-center gap-4 p-4">
        <AddModal list={list} setList={setList} onAdd={handleAddRecord} />
        <TouchableOpacity>
          <Ionicons name="search" size={32} />
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-4 items-center px-4">
        <View className="flex-row gap-2 items-center">
          <View className="bg-[#FF9359] w-4 h-4 rounded-full"></View>
          <Text>Acidic</Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <View className="bg-[#007FAA] w-4 h-4 rounded-full"></View>
          <Text>Alkaline</Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <View className="bg-[#B1C644] w-4 h-4 rounded-full"></View>
          <Text>Normal</Text>
        </View>
      </View>

      <BarChart
        data={barData}
        barWidth={10}
        spacing={30}
        width={300}
        barBorderRadius={10}
        yAxisThickness={0}
        noOfSections={4}
        xAxisColor={"#B1B1B1"}
      />

      <FlatList
        
        data={sortedList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "white" }}>
            <View style={{
              backgroundColor: item.ph <= 4.5 ? "#FF9359" : item.ph > 4.5 && item.ph < 7.5 ? "#B1C644" : "#007FAA",
              flexDirection: "row", justifyContent: "space-between", padding: 10
            }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {new Date(item.dateTime).toDateString()}
              </Text>
              <View style={{ backgroundColor: "#FFFFFF99", borderRadius: 100 }}>
                <Ionicons name="chevron-forward-outline" size={24} color="white" />
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
              <Text style={{ color: "#555" }}>{new Date(item.dateTime).toLocaleTimeString()}</Text>
              <View style={{
                backgroundColor: item.ph <= 4.5 ? "#FF9359" : item.ph > 4.5 && item.ph < 7.5 ? "#B1C644" : "#007FAA",
                width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center", marginLeft: 10
              }}>
                <Text style={{ color: "white" }}>{item.ph}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
