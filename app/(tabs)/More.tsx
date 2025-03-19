import React, { useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity,Image} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import About from "@/components/About";

type DataItem = {
  item: string;
  value?: string;
  content?: JSX.Element;
};

export default function More() {
  const data: DataItem[] = [
    { 
      item: "Account & Settings", 
      content: (
         <SafeAreaView>
          <View className=' h-full  gap-8  mt-8' >
         <View>
           <Text className='text-center font-semibold border-b p-4 ' style={{borderColor:'#8D8D8D'}} >
           Account & Settings
           </Text>
         </View>
          <About/>
         <View className='gap-4'>
           <TouchableOpacity onPress={()=>setScreen("screen1")}>
         <View className='flex flex-row items-center justify-between p-4 rounded-xl 'style={{backgroundColor:"#F3F3F3" , marginHorizontal:20}}>
           <Text>
             Other Setting
           </Text>
           <Ionicons name='chevron-forward-outline' color={"#A4A4A4"} size={25}/>
         </View>
           </TouchableOpacity>
         <View className='flex flex-row items-center justify-between p-4 rounded-xl 'style={{backgroundColor:"#F3F3F3" , marginHorizontal:20}}>
           <Text>
             Change Password
           </Text>
          <Ionicons name='chevron-forward-outline' color={"#A4A4A4"} size={25}/>
         </View>
         </View>
         
       </View></SafeAreaView>
      ),
    },
    { 
      item: "Data Sharing", 
      value: "Account update required",
      content: (
        <View>
          <Text className="font-bold text-lg">Data Sharing</Text>
          <Text className="text-gray-600 mt-2">
            Enable or disable data sharing features for your account.
          </Text>
        </View>
      ),
    },
    { 
      item: "Support & Feedback", 
      content: (
        <View>
          <Text className="font-bold text-lg">Support & Feedback</Text>
          <Text className="text-gray-600 mt-2">
            Reach out for support or share your feedback to help us improve.
          </Text>
        </View>
      ),
    },
    { item: "Challenges" },
    { item: "User Manual" },
    { item: "Recommend pHmeter" },
  ];

  const [screen, setScreen] = useState("screen1");

  return (
    <SafeAreaView className=" h-full bg-white w-full">
      {screen === "screen1" && (
        <>
     
          <View className="border-b w-full px-5 py-4 my-8 bg-white" style={{ borderColor: "#8D8D8D" }}>
            <Text className="font-bold text-lg text-gray-800 text-center">More</Text>
          </View>

       
          <View className="gap-2 w-full px-5">
            {data.map((entry, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setScreen(entry.item)}
                className="bg-gray-200 flex flex-row items-center justify-between p-4 rounded-lg"
                accessible
                accessibilityLabel="entry.item"
              >
                <View>
                  <Text className="font-semibold text-base">{entry.item}</Text>
                  {entry.value && (
                    <Text className="text-gray-500 text-sm font-medium">{entry.value}</Text>
                  )}
                </View>
                <Ionicons name="chevron-forward-outline" size={18} color="grey" />
              </TouchableOpacity>
            ))}
          </View>

      
          <View className="mt-auto mb-4">
            <Text className="text-center text-gray-500">
              Last sync: 03-03-2025, 1:11 PM {"\n"}
              0 unsynced entries
            </Text>
          </View>
        </>
      )}


      {screen !== "screen1" && (
        <View >
          {data.find((entry) => entry.item === screen)?.content || (
            <Text className="text-gray-500  mt-20">
              Details about {screen} will be displayed here.
            </Text>
          )}
          
          <TouchableOpacity
            onPress={() => setScreen("screen1")}
            className="bg-gray-300 mt-4 px-4 py-2 rounded-lg"
          >
            <Text className="text-gray-700 font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}