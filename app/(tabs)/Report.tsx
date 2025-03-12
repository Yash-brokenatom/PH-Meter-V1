import { StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { blue } from 'react-native-reanimated/lib/typescript/Colors'

export default function Report () {
  return (
   <SafeAreaView className='h-full  gap-[40px]  items-center justify-center'>
      <Image className='w-[220px] h-[300px]'  source={require("@/assets/images/Kit.png")}/>
      
      <View className='w-full '>
      <View className='flex flex-row w-full justify-between px-[16px] py-[8px]'> 
        <Text className='text-[#808080] text-[20px] '>
          File Format
        </Text>
        <View className='flex flex-row gap-[8px] items-center'>
          <Image source={require("@/assets/images/pdf.png")}/>
          <Text className='text-xl font-semibold'>
            PDF
          </Text>
        </View>
      </View>
        <Text className='text-[#304FFE] text-2xl font-semibold py-[8px] px-[16px]'>
          Period
        </Text>
        <View className='border-solid border-black border-y  px-[16px] '>
          <TouchableOpacity>
            <Text className='text-2xl py-[8px]'>
            2 Week
            </Text>
          </TouchableOpacity>
          <View className='border-solid border-y border-[#D7D7D7]'>
          <TouchableOpacity >
            <Text className='text-2xl py-[8px] '>
            3 Month
            </Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity className='flex flex-row  items-center justify-between'>
            <Text className='text-2xl py-[8px]'>
            Custom
            </Text>
            <Ionicons name='chevron-forward-outline' size={24} color={"#304FFE"}/>
          </TouchableOpacity>

        </View>
      </View>

      <TouchableOpacity className='bg-[#304FFE]  p-[10px] rounded-[10px] w-[320px] '>
        <Text className='text-[22px] text-center text-white '>
          Continue
        </Text>
      </TouchableOpacity>

   </SafeAreaView>
  )
};