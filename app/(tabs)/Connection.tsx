import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { useState } from "react";
import { Bluetooth } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PHMeterScreen() {
  const [isConnected, setIsConnected] = useState(false);

  const handlePairDevice = () => {
    setIsConnected(true);
  };

  return (
    <SafeAreaView >
      <View className="justify-around h-full items-center">
        <View>
        <Text className="text-4xl font-bold text-center">Connect Your pH Meter</Text>
      <Text className="text-center text-lg mt-1 tracking-wider">
        Ensure your device is turned on and nearby.
      </Text>
        </View>
      
      <View className="items-center mt-6">
       <Image className="w-[280px] h-[300px]"  source={require("@/assets/images/BTKit.png")}/>
      </View>

      <View className="gap-4">
      <View>
      <View className="flex-row items-center mt-4">
        <Bluetooth size={20} color="black" />
        <Text className="ml-2 text-gray-700">Bluetooth® wireless technology</Text>
      </View>
      
      <View className="flex-row items-center  mt-2">
        <Text className="">❤️  Usage activates mySugr PRO</Text>
      </View>
      </View>

      <TouchableOpacity
        onPress={handlePairDevice}
        className="bg-blue-600 py-3 rounded-xl mt-6 mx-auto w-64 items-center"
      >
        <Text className="text-white font-bold text-lg">
          {isConnected ? "Connected" : "Pair my pH Meter"}
        </Text>
      </TouchableOpacity>

     <View>
     <Text className="text-lg font-bold mt-8">How does the pH meter work?</Text>
      <Text className="text-gray-600 mt-1">
        The pH meter talks to myPH and features a spill-resistant vial, large dosing area, and illuminated test strip slot.
      </Text>

      <Text className="text-lg font-bold mt-6">What information is imported?</Text>
      <Text className="text-gray-600 mt-1">pH value</Text>
     </View>
      </View>
      </View>
    </SafeAreaView>
  );
}
