import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";





export default function About() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  
  return (
    <>
      <View className='flex flex-row items-center justify-between border-y p-4 ' style={{borderColor:"#E7E6E6"}} >
               <View className='flex flex-row items-center gap-4'>
                 <Image style={{width:60 , height:60, borderRadius:100}} source={require("@/assets/images/icon.png")}/>
                 <View>
                   <Text>
                     About me
                   </Text>
                   <Text>
                     email
                   </Text>
                 </View>
               </View>
                <TouchableOpacity onPress= {()=>setIsModalVisible(true)}>
                <Ionicons name='chevron-forward-outline' color={"#A4A4A4"} size={25}/>
                </TouchableOpacity>
               </View>
      {/* Modal */}
      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >

        <View  style={{backgroundColor:"#EBEBEB",flex:1,borderRadius:20,top:10}} >
            <View className='flex-row justify-between border-b p-4' style={{borderColor:'#D7D7D7'}}>
              <TouchableOpacity onPress={()=>setIsModalVisible(false)}>
              <Text className='font-semibold text-[#304FFE]'>
                back
              </Text>
              </TouchableOpacity>
              <Text className='font-semibold '>
                About me
              </Text>
              <View className="px-4"></View>
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
            <TouchableOpacity onPress={()=> setIsModalVisible(false)} style={{backgroundColor:"#304FFE",padding:15,margin:20,alignItems:'center',borderRadius:10}}>
              <Text className='text-white font-semibold text-xl'>
                Save 
              </Text>
            </TouchableOpacity>
            </View>
      </Modal>
    </>
  );
}
