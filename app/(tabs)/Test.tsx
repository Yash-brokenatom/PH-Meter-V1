import { StyleSheet, Text, View,Image,TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function Test() {
  return (
    <View >
    <View className='flex-row justify-between border-b p-4' style={{borderColor:'#D7D7D7'}}>
      <Text className='font-semibold text-[#304FFE]'>
        back
      </Text>
      <Text className='font-semibold '>
        About me
      </Text>
      <View></View>
    </View>
    
          
      <View className='p-4 gap-4'>
        <View className='mb-6 items-center relative'>
      <Image  style={{width:100 , height:100 , borderRadius:100}} source={require("@/assets/images/icon.png")} />
      <Ionicons style={{backgroundColor:"black", borderRadius:100,padding:4 ,position:"absolute",bottom:0,right:130}} name='camera' color={"white"} size={20} />
    </View>
    <View className='gap-2'>
      <Text>
       First Name
      </Text>
      <TextInput style={{backgroundColor:'white',padding:10,borderRadius:5}} placeholder='First Name' />
      </View>
    <View className='gap-2'>
      <Text>
       Last Name
      </Text>
      <TextInput style={{backgroundColor:'white',padding:10,borderRadius:5}} placeholder='Last Name' />
      </View>
    <View className='gap-2'>
      <Text>
       Date of Birth
      </Text>
      <TextInput  style={{backgroundColor:'white',padding:10,borderRadius:5}} placeholder='Date of Birth' />
      </View>
    <View className='gap-2'>
      <Text>
      Contact Number
      </Text>
      <TextInput inputMode="numeric" style={{backgroundColor:'white',padding:10,borderRadius:5}} placeholder='9635466772' />
      </View>
    <View className='gap-2'>
      <Text>
       Email
      </Text>
      <TextInput inputMode="email" style={{backgroundColor:'white',padding:10,borderRadius:5}} placeholder='oenrila_elp3@isb.edu' />
      </View>
    </View>
    <TouchableOpacity style={{backgroundColor:"#304FFE",padding:15,margin:20,alignItems:'center',borderRadius:10}}>
      <Text className='text-white font-semibold text-xl'>
        Save 
      </Text>
    </TouchableOpacity>
    </View>
  )
}