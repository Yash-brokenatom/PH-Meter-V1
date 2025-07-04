import { View, Text,TextInput} from 'react-native'
import React from 'react'
import { LinearGradient } from "react-native-linear-gradient"
import { HelloWave } from '@/components/HelloWave'

export default function Test() {
  return (
    
    <View className=' h-full justify-around bg-white'>
      <View className='items-center'>
      <View className='flex flex-row items-center'>
     <Text className='text-4xl font-bold'>Hey, Hello</Text>
     <HelloWave  />
    </View>
    <View>
      <Text>
      Enter your credentials to access your account
      </Text>
    </View>
      </View>
      <View>
        <Text className='text-xl'>
          Email Address
        </Text>
        <TextInput keyboardType="email-address" placeholder='Email' style={{padding:5}} />
      </View>
    <LinearGradient start={{x:0 , y:0}} end={{x:1, y:0}} colors={["#0983C8","#023E77"]}>
      <Text >
        hello
      </Text>
    </LinearGradient>
          
    </View>
    
   
  )
}