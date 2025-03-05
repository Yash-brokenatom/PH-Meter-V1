import { StyleSheet, Text, View , Image ,TouchableOpacity} from 'react-native'
import React from 'react';
import "@/global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
export default function index () {
    const navigation = useNavigation<NavigationProp<any>>();
  return (
    <SafeAreaView className='bg-white h-full justify-center items-center gap-[71px] p-4'>
        <View className='justify-center items-center gap-[88px]'>
            <Image source={require("@/assets/images/splash-icon.png")} />
            <Text className=' text-center font-bold text-5xl '>Track Your Body’s pH Balance Effortlessly</Text>
        </View>
        <View className='w-full gap-5'>
            <TouchableOpacity className='bg-[#324373] w-full p-4 rounded-full' onPress={()=> navigation.navigate("GetStarted")} >
                <Text className='text-white text-center'>
                    Get Started
                </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=> navigation.navigate("Login")} className='bg-[#324373] w-full p-4 rounded-full'  >
                <Text className='text-white text-center'>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>  
)
};