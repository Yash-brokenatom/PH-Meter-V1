import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { HelloWave } from "@/components/HelloWave";
import { useNavigation } from "expo-router";

const Login = () => {
    const navigation=useNavigation<any>();
  return (
    <View className="flex-1 items-center justify-center bg-white px-6 gap-12">
      {/* Header */}
      <View className="justify-center items-center gap-5">
      <View className="flex flex-row">
      <Text className="text-4xl font-bold">Hey, Hello</Text>
      <HelloWave/>
      </View>
      <Text className=" text-center text-xl px-12">Enter your credentials to access your account</Text>
      </View>

      {/* Social Login Buttons */}
      <View className="flex-row gap-4 mt-6">
        <TouchableOpacity className="flex-row items-center border border-gray-300 px-6 py-3 rounded-lg">
          <FontAwesome name="apple" size={20} color="black" />
          <Text className="ml-2 text-lg font-medium">Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center border border-gray-300 px-6 py-3 rounded-lg">
          <FontAwesome name="google" size={20} color="red" />
          <Text className="ml-2 text-lg font-medium">Google</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="flex-row items-center w-full my-4">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="text-gray-400 mx-2">or</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      {/* Input Fields */}
      <View className="w-full">
        <TextInput
          className="w-full border border-gray-300 rounded-lg p-3 text-lg mb-4"
          placeholder="Name"
        />
        <TextInput
          className="w-full border border-gray-300 rounded-lg p-3 text-lg"
          placeholder="Email address"
          keyboardType="email-address"
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity className="w-full bg-blue-600 py-4 rounded-lg mt-6" onPress={()=> navigation.navigate("(tabs)")}>
        <Text className="text-white text-center text-lg font-semibold">Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
