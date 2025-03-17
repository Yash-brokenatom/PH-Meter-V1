import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Report() {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [range,showRange]=useState(false);

  const onChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      if (editingDate === "fromDate") {
        setFromDate(selectedDate);
      } else if (editingDate === "toDate") {
        setToDate(selectedDate);
      }
    }
    setShowDatePicker(false);
  };

  const onhandle = ()=>{
    if (range===false){
      showRange(true)
    }
    else if (range===true){
      showRange(false)
    }
  }
  return (
    <SafeAreaView className="h-full gap-8 items-center ">
      <Image
        style={{width:200, height:270,marginTop:80}}
        source={require("@/assets/images/Kit.png")}
      />

      <View className="w-full ">
        <View className="flex flex-row w-full justify-between px-[16px] py-[8px]">
          <Text className="text-[#808080] text-[20px] ">File Format</Text>
          <View className="flex flex-row gap-[8px] items-center">
            <Image source={require("@/assets/images/pdf.png")} />
            <Text className="text-xl font-semibold">PDF</Text>
          </View>
        </View>

        <Text className="text-[#304FFE] text-2xl font-semibold py-[8px] px-[16px]">
          Period
        </Text>
        <View className="border-solid border-black border-y px-[16px]">
          <TouchableOpacity>
            <Text className="text-2xl py-[8px]">2 Week</Text>
          </TouchableOpacity>
          <View className="border-solid border-y border-[#D7D7D7]">
            <TouchableOpacity>
              <Text className="text-2xl py-[8px] ">3 Month</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
  className="flex flex-row items-center justify-between"
  onPress={onhandle}
>
  <Text className="text-2xl py-[8px]">Custom</Text>
  <Ionicons
    name="chevron-forward-outline"
    size={24}
    color={"#304FFE"}
    style={{
      transform: [{ rotate: range ? "90deg" : "0deg" }]}}
  />
</TouchableOpacity>

        { range && <View>
         <View className="flex flex-row justify-between border-[#D7D7D7] border-y py-[8px]">
            <Text className="text-[#808080] text-[18px]">From Date</Text>
            {showDatePicker && editingDate === "fromDate" && (
              <DateTimePicker value={fromDate} mode="date" onChange={onChange} />
            )}
            <TouchableOpacity onPress={() => {
              setEditingDate("fromDate");
              setShowDatePicker(true);
            }}>
              <Text className="text-[#808080] text-[18px]">
                {fromDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-between py-[8px]">
            <Text className="text-[#808080] text-[18px] ">To Date</Text>
            {showDatePicker && editingDate === "toDate" && (
              <DateTimePicker value={toDate} mode="date" onChange={onChange} />
            )}
            <TouchableOpacity onPress={() => {
              setEditingDate("toDate");
              setShowDatePicker(true);
            }}>
              <Text className="text-[#808080] text-[18px]">
                {toDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>}
      </View>
         </View> 

      <TouchableOpacity className="bg-[#304FFE] p-[10px] rounded-[10px] w-[320px]">
        <Text className="text-[22px] text-center text-white ">Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}