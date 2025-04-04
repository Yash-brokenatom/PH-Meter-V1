import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { insertPreference , updateData,fetchPreferencesAsync} from "@/Database/Database";
import { useUser } from '@clerk/clerk-expo'


export default function About() {
  const { user } = useUser()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data,setData]=useState({
  name:"",
  last:"",
  date:"",
  contact:"",
  email:""
});

const checkData = async(field:string)=>{
  try{
    const preferences = await fetchPreferencesAsync();
    if (preferences){
      const preference = preferences.find((pref)=>pref?.field===field);
      return preference? preference.value:null;
    }
  }catch(error){
     console.log("error",error)
  }
}

const handleSave = async()=>{
  if(data.name|| data.last|| data.email|| data.date||data.contact)
    {if(data.name ){
      const existName = await checkData("name")
      if(existName){
        updateData("name",data.name)
      }else{
       insertPreference("name",data.name)
      }
    
    console.log(insertPreference,"1")
  }if (data.last){
    await insertPreference("last", data.last)
    console.log(insertPreference,"2")
  }if(data.date){
    await insertPreference("last", data.date)
    console.log(insertPreference,"3")
  }
    if (data.contact){
    await insertPreference("last", data.contact)
    console.log(insertPreference,"4")
  
  }if(data.email){
    await insertPreference("last", data.email)
    console.log(insertPreference,"5")
  
  } }else{
    alert("plese enter a data")
  }
}

  
  
  return (
    <>
                <TouchableOpacity onPress= {()=>setIsModalVisible(true)}>
      <View className='flex flex-row items-center justify-between border-y p-4 ' style={{borderColor:"#E7E6E6"}} >
               <View className='flex flex-row items-center gap-4'>
                 <Image style={{width:60 , height:60, borderRadius:100}} source={require("@/assets/images/icon.png")}/>
                 <View>
                   <Text>
                     About me
                   </Text>
                   <Text>
                   {user?.emailAddresses[0].emailAddress}
                   </Text>
                 </View>
               </View>
                <Ionicons name='chevron-forward-outline' color={"#A4A4A4"} size={25}/>
               </View>
                </TouchableOpacity>
               <>
               
               </>
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
              <TextInput value={data.name} onChangeText={(text)=>setData(prev=>({...prev,name:text}))} style={{backgroundColor:'white',padding:10,borderRadius:5}} placeholder='First Name' />
              </View>
            <View className='gap-2'>
              <Text>
               Last Name
              </Text>
              <TextInput value={data.last} onChangeText={(text)=> setData(prev=>({...prev,last:text}))} style={{backgroundColor:'white',padding:10,borderRadius:5}} placeholder='Last Name' />
              </View>
            <View className='gap-2'>
              <Text>
               Date of Birth
              </Text>
              <TextInput value={data.date} onChangeText={(text)=> setData(prev=>({...prev,date:text}))}  style={{backgroundColor:'white',padding:10,borderRadius:5}} placeholder='16/2/2009' />
              </View>
            <View className='gap-2'>
              <Text>
              Contact Number
              </Text>
              <TextInput value={data.contact} onChangeText={(text)=> setData(prev=>({...prev,contact:text}))} inputMode="numeric" style={{backgroundColor:'white',padding:10,borderRadius:5}} placeholder='9635466772' />
              </View>
            <View className='gap-2'>
              <Text>
               Email
              </Text>
              <TextInput value={data.email} onChangeText={(text)=> setData(prev=>({...prev,email:text}))} inputMode="email" style={{backgroundColor:'white',padding:10,borderRadius:5}} placeholder='oenrila_elp3@isb.edu' />
              </View>
            </View>
            <TouchableOpacity onPress={()=>handleSave()} style={{backgroundColor:"#304FFE",padding:15,margin:20,alignItems:'center',borderRadius:10}}>
              <Text className='text-white font-semibold text-xl'>
                Save 
              </Text>
            </TouchableOpacity>
            <View>
              <Text>
                {data.name}
              </Text>
            </View>
            </View>
      </Modal>
    </>
  );
}