import { StyleSheet, Text, View , Image ,TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react';
import "@/global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
export default function index () {
    const navigation = useNavigation<NavigationProp<any>>();
  return (

    <SafeAreaView className='bg-white h-full justify-center items-center gap-[71px] '>
        <View className='justify-center items-center gap-[88px] w-full'>
            <Image style={{height:180, width:180}} source={require("@/assets/images/splash-icon.png")} />
            <Text className=' text-center font-semibold text-4xl  '>Track Your Body’s pH Balance Effortlessly</Text>
        </View>
        <View className='w-full gap-5 p-12'>
            <TouchableOpacity className='bg-[#304FFE]  p-5 rounded-xl  ' onPress={()=> navigation.navigate("GetStarted")} >
                <Text className='text-white text-center'>
                    Get Started
                </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=> navigation.navigate("Login")} className=' w-full p-5 rounded-xl border' style={{borderColor:"#304FFE",borderWidth:2}}  >
                <Text className='text-[#304FFE] text-center'>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
        {/* <Redirect href={"./(tabs)/Test"}/> */}
    </SafeAreaView>  
)
}; 