import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";


interface SelectedOptions {
  health?: string;
  frequency?: string;
  device?: string;
  reminders?: string;
}

const OnboardingScreen = ({  }: { navigation: any }) => {

  const navigation =useNavigation<NavigationProp<any>>();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<Swiper | null>(null);
  
  const handleSelect = (step: keyof SelectedOptions, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [step]: option }));
  };

  const handleContinue = () => {
    if (currentIndex < 3) {
      swiperRef.current?.scrollBy(1); // Move to the next step
      setCurrentIndex((prev) => prev + 1);
      navigation.navigate("Login");
    } else {
      console.log("Final Selections:", selectedOptions);
      // Handle final step, e.g., navigate to the main app
    }
  };
  const handleRevert = () => {
    if (currentIndex > 0) {
      swiperRef.current?.scrollBy(-1); // Move to the previous step
      setCurrentIndex((prev) => prev - 1);
    } else {
      console.log("Already at the beginning");
      // Handle the first step case, if needed
    }
  };


  const renderSelectionStep = (
    stepKey: keyof SelectedOptions,
    question: string,
    options: string[]
  ) => (

    <View className="flex-1 justify-start items-center px-6 mt-20 bg-white">
      
      <Text className="text-xl font-bold text-center mb-6">{question}</Text>
      {options.map((item) => (
        <TouchableOpacity
          key={item}
          className={`w-full p-4 border rounded-lg my-2 
            ${selectedOptions[stepKey] === item ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
          onPress={() => handleSelect(stepKey, item)}
        >
          <Text className={`text-lg text-center 
            ${selectedOptions[stepKey] === item ? "text-white" : "text-gray-800"}`}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <SafeAreaView className="  bg-white h-full">
          <View>
      <TouchableOpacity className="m-8 mt-14 bg-[#304FFE] w-14 rounded-xl" onPress={handleRevert}>
      <Ionicons
        name="chevron-back-outline"
        size={44}
        color="white"
      />
      </TouchableOpacity>
    </View>
      {/* Swiper */}
      <View className="flex-1">
    
        
        <Swiper
          ref={(ref) => (swiperRef.current = ref)}
          loop={false}
          showsPagination={true}
          activeDotColor="#3366FF"
          onIndexChanged={(index) => setCurrentIndex(index)}
        >
          {renderSelectionStep(
            "health",
            "Do you have any existing health conditions?",
            ["Kidney issues", "Diabetes", "UTI", "Acidic body symptoms", "None"]
          )}

          {renderSelectionStep(
            "frequency",
            "How frequently would you like to measure your pH levels?",
            ["Daily", "Weekly", "Monthly", "Only when needed"]
          )}

          {renderSelectionStep(
            "device",
            "Do you have a compatible pH meter device?",
            ["Yes", "No"]
          )}

          {renderSelectionStep(
            "reminders",
            "Would you like to receive reminders for pH checks?",
            ["Yes", "No"]
          )}
        </Swiper>
      </View>

      {/* Fixed Continue Button at the Bottom */}
      <View className="w-full p-4">
        <TouchableOpacity
          className="w-full p-4 bg-blue-600 rounded-lg"
          onPress={handleContinue }
        >
          <Text className="text-lg text-white text-center font-semibold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
