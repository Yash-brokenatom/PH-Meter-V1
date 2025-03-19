import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { useState } from "react";
import { Bluetooth } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomModal from "@/components/Modall";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";

export default function PHMeterScreen() {
  const [ModalVisible, setModalVisible] = useState(false);
  const [setup, setSetup] = useState("Phase1");
  const [screen, setScreen] = useState("Screen1");
  const [viewDevice,setViewDevice]= useState(true)
  const modalContent = () => {
    return (
      <View>
        {screen === "Screen1" && (
          <View>
            <View
              className="flex-row items-center justify-between p-4 border-b "
              style={{ borderColor: "#D7D7D7" }}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={"chevron-back-outline"}
                  size={20}
                  color={"#304FFE"}
                />
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text className="text-[#304FFE] font-semibold text-md">
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text className="font-semibold text-xl">Connect</Text>
              </View>
              <View className="mx-8"></View>
            </View>
            <View className="gap-4 p-4">
              <Text className="font-semibold text-xl ">
                Let's connect your pH meter
              </Text>
              <View className="flex-row items-center gap-3">
                <Text
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#304FFE",
                    textAlign: "center",
                    borderRadius: 100,
                    color: "white",
                  }}
                >
                  1
                </Text>
                <Text className="font-semibold">
                  Power on <Text className="font-normal">your meter.</Text>
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Text
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#304FFE",
                    textAlign: "center",
                    borderRadius: 100,
                    color: "white",
                  }}
                >
                  2
                </Text>
                <Text className="">
                  Go to your meter and{" "}
                  <Text className="font-semibold">select Settings,</Text> then{" "}
                  <Text className="font-semibold">Wireless,</Text> then{" "}
                  <Text className="font-semibold">Pairing.</Text>
                </Text>
              </View>
              <View className="flex-row items-center gap-3 ">
                <Text
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#304FFE",
                    textAlign: "center",
                    borderRadius: 100,
                    color: "white",
                  }}
                >
                  3
                </Text>
                <Text>
                  Then{" "}
                  <Text className="font-semibold">select "Pair Device"</Text>{" "}
                  and follow the on-screen instructions.
                </Text>
              </View>
            </View>
            <View className="mt-20">
              {setup === "Phase1" && (
                <TouchableOpacity onPress={() => setSetup("Phase2")}>
                  <View className="items-center gap-4 mt-20">
                    <Text className="text-center font-bold text-xl">
                      Looking for devices
                    </Text>
                    <Image source={require("@/assets/images/load.png")} />
                  </View>
                </TouchableOpacity>
              )}

              {setup === "Phase2" && (
                <View className=" justify-center p-4 ">
                  <Text className="text-lg font-bold mb-4">
                    Select your Smart pH
                  </Text>
                 <TouchableOpacity onPress={()=>{setModalVisible(false); setViewDevice(false)}}>
                 <View className="w-80 p-4 bg-white rounded-lg shadow-md mb-4 flex-row items-center justify-between ">
                    <View className="flex-row items-center gap-2" >
                      <Ionicons name="calculator" size={24} />
                      <View>
                        <Text className="text-base font-semibold">
                          SN 92540667324
                        </Text>
                        <Text className="text-sm text-gray-500">
                          Last import 5 seconds ago
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Ionicons name="chevron-forward-outline" size={24} />
                    </View>
                  </View>
                 </TouchableOpacity>
                  <View style={{ margin: 70, alignItems: "center" }}>
                    <TouchableOpacity onPress={() => setSetup("Phase1")}>
                      <Text className="text-sm text-center text-gray-500 ">
                        Not yours?
                      </Text>
                      <Text className="text-sm text-gray-500 ">
                        We are scanning for more...
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    className="w-80 p-4 rounded-lg border"
                    style={{ borderColor: "#304FFE", borderWidth: 2 }}
                    onPress={() => setScreen("Screen2")}
                  >
                    <Text className="text-center text-[#304FFE] font-semibold">
                      Enter Device Code Manually
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
        {screen === "Screen2" && (
          <View className="gap-12">
            <View
              className="flex-row items-center justify-between p-4 border-b "
              style={{ borderColor: "#D7D7D7" }}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={"chevron-back-outline"}
                  size={20}
                  color={"#304FFE"}
                />
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text className="text-[#304FFE] font-semibold text-md">
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text className="font-semibold text-xl">Connect</Text>
              </View>
              <View className="mx-8"></View>
            </View>
            <View style={{ gap: 80, padding: 20 }}>
              <View className="items-center gap-12">
                <Text className="text-4xl text-[#304FFE] font-semibold">
                  Meter found!
                </Text>
                <Image source={require("@/assets/images/Meter.png")} />
                <Text>
                  <Text className="font-bold">Find the code </Text>displayed on
                  the meter
                </Text>
              </View>
              <TouchableOpacity
                className="bg-[#304FFE] p-4 rounded-xl"
                onPress={() => setScreen("Screen3")}
              >
                <Text className="text-xl text-white text-center">
                  Next: enter PIN code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {screen === "Screen3" && (
          <View className="gap-12">
            <View
              className="flex-row items-center justify-between p-4 border-b "
              style={{ borderColor: "#D7D7D7" }}
            >
              <View className="flex-row items-center px-6"></View>
              <View>
                <Text className="font-semibold text-xl">Connect</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => setScreen("Screen1")}>
                  <Text className="text-[#304FFE] font-semibold text-md">
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ gap: 80, padding: 20 }}>
              <View className="items-center gap-12">
                <Text className="text-4xl text-[#304FFE] font-semibold">
                  Meter found!
                </Text>
                <Image source={require("@/assets/images/Objects.png")} />
                <Text className="text-center px-12">
                  Data from this device is imported automatically from now on.
                </Text>
              </View>
              <TouchableOpacity
                className="bg-[#304FFE] p-4 rounded-xl"
                onPress={() => {setScreen("Screen1");setViewDevice(false)}}
              >
                <Text className="text-xl text-white text-center">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View className="justify-around h-full mx-4  ">
        <View>
          <Text className="text-4xl font-bold text-center">
            Connect Your Smart pH
          </Text>
          <Text className="text-center text-lg mt-1 tracking-wider">
            Ensure your device is turned on and nearby.
          </Text>
        </View>

        <View className="items-center mt-6">
          <Image
           style={{width:188,height:200}}
            source={require("@/assets/images/BTKit.png")}
          />
        </View>

        { viewDevice && (<View className="gap-4 ">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-[#304FFE]  py-3 rounded-xl mt-6  items-center  "
          >
            <Text className="text-white font-bold text-lg">
              Pair my Smart pH
            </Text>
          </TouchableOpacity>
          <CustomModal
            isVisible={ModalVisible}
            content={modalContent()}
            onClose={() => setModalVisible(false)}
          />
          <View className="flex-row  items-center gap-3">
            <Image source={require("@/assets/images/btimg.png")} />
            <Text className="text-left ">
              During the Bluetooth® pairing process, you may be asked to enter
              a Device Code. This code is printed on your Smart pH device.
              Please keep it nearby to complete the connection successfully.
            </Text>
          </View>
        </View>) }
        { !viewDevice && (<View className="gap-4 ">
          <View className="flex-row items-center mb-2">
        <MaterialCommunityIcons name="bluetooth" size={18} color="#000" />
        <Text className="ml-2 text-black text-base">Bluetooth® wireless technology</Text>
      </View>
      
      <View className="flex-row items-center mb-4">
        <Ionicons name="heart" size={18} color="red" />
        <Text className="ml-2 text-black text-base">Usage activates mySugr PRO</Text>
      </View>
      
      <View className="w-80 p-4 bg-white rounded-lg shadow-md mb-4 flex-row items-center justify-between ">
                    <View className="flex-row items-center gap-2">
                      <Ionicons name="calculator" size={24} />
                      <View>
                        <Text className="text-base font-semibold">
                          SN 92540667324
                        </Text>
                        <Text className="text-sm text-gray-500">
                          Last import 5 seconds ago
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Ionicons name="chevron-forward-outline" size={24} />
                    </View>
                  </View>
      
      <TouchableOpacity className= "p-3  mb-6 border rounded-xl" style={{borderColor:"#CF2828"}} onPress={()=>setViewDevice(true)}>
        <Text className=" text-center font-bold text-lg"style={{color:'#CF2828'}}>Disconnect</Text>
      </TouchableOpacity>
      

      <Text className="text-black font-bold text-lg mb-2">How does the pH meter work?</Text>
      <Text className="text-gray-700 text-base">
        The pH meter talks to myPH and features a spill-resistant vial, large dosing area, and illuminated test strip slot.
      </Text>
        </View>) }
      </View>
    </SafeAreaView>
  );
}
