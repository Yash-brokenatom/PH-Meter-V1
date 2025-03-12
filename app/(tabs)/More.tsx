import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

export default function More() {
  const data = [
    { item: "Account & Settings" },
    { item: "Data Sharing", value: "Account update required" },
    { item: "Support & Feedback" },
    { item: "Challenges" },
    { item: "User Manual" },
    { item: "Recommend pHmeter" }
  ];

  return (
    <SafeAreaView className='justify-around items-center h-full bg-white'>
      <View className='mx-[20px] gap-[10px] '>
        {data.map((entry, index) => (
          <TouchableOpacity key={index} className='bg-[#F3F3F3] flex flex-row items-center w-full justify-between p-4 rounded-lg'>
            <Text className="font-semibold">
  {entry.item}
  {entry.value && (
    <Text className="text-[#B3B3B3] text-sm font-medium">
      {"\n"}{entry.value}
    </Text>
    
  )}
</Text>
  <Ionicons name='chevron-forward-outline' size={18} color={"grey"} />
          </TouchableOpacity>
        ))}
      </View>
      <View className=''>
        <Text className='text-center text-[#B3B3B3] '>
          Last sync: 03-03-2025, 1:11 PM {"\n"}
          0 unsynced entries
        </Text>
      </View>
    </SafeAreaView>
  );
}
