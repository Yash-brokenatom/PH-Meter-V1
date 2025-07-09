import React, { JSX, useEffect, useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity,Image,TextInput,FlatList} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import About from "@/components/About";
import CustomModal from "@/components/Modall";
import Tags from "@/components/Tags";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
 import { setupDatabase, insertRecord,fetchRecords } from "@/Database/Database";
import { useAuth } from "@clerk/clerk-expo";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";


type DataItem = {
  item: string;
  value?: string;
  content?: JSX.Element;
};




export default function More() {


  const navigation  = useNavigation<NavigationProp<any>>();
  const [records, setRecords] = useState<{ id: number; ph: number; dateTime: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
    const [dateTime, setDateTime] = useState<Date>(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [ph, setPh] = useState<number | null>(null);
    const [screen, setScreen] = useState("View1");
    const [currentScreen, setCurrentScreen] = useState('Screen1');
    const onChange = (event: any, selected?: Date) => {
      if (selected) {
        setDateTime(selected);
      }
      setShowDate(false);
      setShowTime(false);
    };


    //  for log out 

const {signOut} = useAuth(); 

const singoutHandle = async() => {
  await signOut();
  navigation.dispatch(
    CommonActions.reset({
      index:0,
      routes:[{name:'Login'}] 
    })
  )
}

  // for saving the array of ph 



  
  const handleData = async() => {
    if (ph !== null) { 
      await insertRecord(ph,dateTime.toString());
      console.log(insertRecord);
      setIsModalVisible(false);
      setScreen("View1")}
      else {
        alert("Failed to save data. Please try again.");
    } 
   
  };

    const dataUnits=[
      "UNITS","MG","PILLS","PUFFS","SUPPOSITIRIES"
    ]
  
    useEffect(()=>{
      if(screen !== "View1"){
        setIsModalVisible(true);
      }
    })
//  data for the modal
  const modalContent = ()=>{
  return <View className="h-full">{currentScreen === "Screen1" && (
    <View style={{backgroundColor:"#EBEBEB" , flex:1, borderRadius:20,top:10}}>
    <View style={{flexDirection: "row",padding: 16,justifyContent: "space-between",borderBottomWidth:1,borderColor: "#D7D7D7", borderStyle: "solid"}}>
      <TouchableOpacity onPress={() => {setIsModalVisible(false);setScreen("View1")}}>
        <Text className="text-[#304FFE]" >
          Cancel
        </Text>
      </TouchableOpacity>
       <Text className="font-bold">
        New Entry
       </Text>
      <TouchableOpacity  >
        <Text className="text-[#304FFE]" >Save</Text>
      </TouchableOpacity>
    </View>
    <View style={{ padding:20 }}>
  
      <View className="gap-5">
        <View className="gap-2">
          <Text>Date & Time</Text>
          <View className="flex-row items-center bg-white justify-between p-4 rounded-lg">
            <View className="flex flex-row gap-2">
              <Ionicons name="calendar" size={20} />
              <TouchableOpacity onPress={() => setShowDate(true)}>
                <Text>{dateTime.toDateString()}</Text>
              </TouchableOpacity>
              <Text>
                at
              </Text>
              <TouchableOpacity onPress={() => setShowTime(true)}>
                <Text>{dateTime.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              {showDate && (
                <DateTimePicker value={dateTime} mode="date" onChange={onChange} />
              )}
              {showTime && (
                <DateTimePicker value={dateTime} mode="time" onChange={onChange} />
              )}
            </View>
            <Ionicons name="chevron-forward" size={24}/>
          </View>
        </View>

        <View className="gap-2">
          <Text>pH Value</Text>
          <View className="bg-white p-4 rounded-lg flex-row gap-4">
            <View
              style={{
                backgroundColor: 
                  ph === null ? "#B1C644" : 
                  ph <= 4.5 
                  ? "#FF9359"
                  : ph > 4.5 && ph < 7.5
                  ? "#B1C644"
                  : "#007FAA",
                width: 20,
                borderRadius: 100,
              }}
            />

            <TextInput
            style={{width:'100%'}}
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                setPh(isNaN(numericValue) ? null : numericValue);
              }} 
              value={ph !== null ? ph.toString() : ""}
              placeholder="5.5"
            />
          </View>
        </View>

        <View className="gap-2 ">
          <Text>Pills</Text>
          <View className=" ">
            <View style={{flexDirection:"row", alignContent:"center" , justifyContent:"space-between", padding:20 , backgroundColor:"white" ,marginVertical:1,borderTopLeftRadius:10,borderTopRightRadius:10}} >
              <View className="flex flex-row gap-2 items-center ">
                <FontAwesome5 name="capsules" size={24} color="black" />
                <Text>{dateTime.toDateString()}</Text>
                <Text>
                  at
                </Text>
                <Text>{dateTime.toLocaleTimeString()}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24}/>
            </View>
            <TouchableOpacity style={{borderBottomLeftRadius:10,backgroundColor:"white",borderBottomRightRadius:10}} onPress={()=> setCurrentScreen("Screen2")}>
            <Text className="text-center text-[#304FFE] font-semibold p-3 ">
              Add Pills
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    <View style={{margin:30}}>
      <TouchableOpacity onPress={handleData} className="bg-[#304FFE] p-[10px] rounded-[10px] " >
        <Text className=" text-white text-center text-[22px]" >Save</Text>
      </TouchableOpacity>
    </View>
  </View>
  )}
  {
    currentScreen === "Screen2" && (
      <View style={{backgroundColor:"#EBEBEB" , flex:1, borderRadius:20,top:10}}>
      <View style={{flexDirection: "row",padding: 16,justifyContent: "space-between",borderBottomWidth:1,borderColor: "#D7D7D7", borderStyle: "solid"}}>
        <TouchableOpacity onPress={() =>{ setIsModalVisible(false) ; setScreen("View1")}}>
          <Text className="text-[#304FFE]" >
            Cancel
          </Text>
        </TouchableOpacity>
         <Text className="font-bold">
          New Medicine
         </Text>
        <TouchableOpacity onPress={()=>setCurrentScreen("Screen1")}>
          <Text className="text-[#304FFE]" >Save</Text>
        </TouchableOpacity>
      </View>

      <View className="p-4 gap-8">
        <View className="gap-2">
          <Text>
          Medicine Name
          </Text>
          <TextInput
          placeholder="New Medicine"
          style={{backgroundColor:"white",padding:10,height:40,borderRadius:5}}
          />
        </View>
        <View >
          <Text>
          Medicine Units
          </Text>
          <FlatList  horizontal
          className="py-4"
          data={dataUnits}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({item})=> (
           <TouchableOpacity>
             <Text style={{marginHorizontal: 9,paddingHorizontal: 16,backgroundColor: "white",borderRadius: 9999,borderWidth: 1,borderColor: "black"}}>{item}</Text>
           </TouchableOpacity>
          )}
          />
        </View>
        <View className="gap-2">
          <Text>Pills</Text>
          <View className="bg-white rounded-lg  ">
            <View style={{flexDirection:"row", alignContent:"center" , justifyContent:"space-between",borderColor:"black" , borderBottomWidth:1, padding:20}} >
              <View></View>
              <Ionicons name="chevron-forward" size={24}/>
            </View>
            <TouchableOpacity onPress={()=> setCurrentScreen("Screen2")}>
            <Tags/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
     </View>
    )
  }</View>
  }
  const data: DataItem[] = [
    { 
      item: "Account & Settings", 
      content: (
         <SafeAreaView>
          <View className=' h-full  gap-8  mt-8' >
         <View>
           <Text className='text-center font-semibold border-b p-4 ' style={{borderColor:'#8D8D8D'}} >
           Account & Settings
           </Text>
         </View>
          <About/>
         <View className='gap-4'>
           <TouchableOpacity onPress={()=>setScreen("View1")}>
         <View className='flex flex-row items-center justify-between p-4 rounded-xl 'style={{backgroundColor:"#F3F3F3" , marginHorizontal:20}}>
           <Text>
             Basic Info
           </Text>
           <Ionicons name='chevron-forward-outline' color={"#A4A4A4"} size={25}/>
         </View>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>setScreen("View1")}>
         <View className='flex flex-row items-center justify-between p-4 rounded-xl 'style={{backgroundColor:"#F3F3F3" , marginHorizontal:20}}>
           <Text>
             Other Setting
           </Text>
           <Ionicons name='chevron-forward-outline' color={"#A4A4A4"} size={25}/>
         </View>
           </TouchableOpacity>
         <View className='flex flex-row items-center justify-between p-4 rounded-xl 'style={{backgroundColor:"#F3F3F3" , marginHorizontal:20}}>
           <Text>
             Change Password
           </Text>
          <Ionicons name='chevron-forward-outline' color={"#A4A4A4"} size={25}/>
         </View>
          <TouchableOpacity onPress={()=>singoutHandle()}>
         <View className='flex flex-row items-center justify-between p-4 rounded-xl 'style={{backgroundColor:"#F3F3F3" , marginHorizontal:20}}>
           <Text>
             Logout
           </Text>
           <Ionicons name='chevron-forward-outline' color={"#A4A4A4"} size={25}/>
         </View>
           </TouchableOpacity>
         </View>
         
       </View></SafeAreaView>
      ),
    },
    { 
      item: "Manual Entry", 
      content: (
        <CustomModal isVisible={isModalVisible} onClose={()=>setIsModalVisible(false)} content={modalContent()}/>
      ),
    },
    { 
      item: "Support & Feedback", 
    },
    { item: "User Manual" },
  ];

  //  actual code start from here
  return (
    <SafeAreaView className=" h-full bg-white w-full">
      {screen === "View1" && (
        <>
     
          <View className="border-b w-full px-5 py-4 my-8  bg-white" style={{ borderColor: "#8D8D8D" }}>
            <Text className="font-bold text-lg text-gray-800 text-center">More</Text>
          </View>

       
          <View className="gap-2  w-full px-5">
            {data.map((entry, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setScreen(entry.item)}
                className="bg-gray-200 flex flex-row items-center justify-between p-4 rounded-lg"
                accessible
                accessibilityLabel="entry.item"
              >
                <View>
                  <Text className="font-semibold text-base">{entry.item}</Text>
                  {entry.value && (
                    <Text className="text-gray-500 text-sm font-medium">{entry.value}</Text>
                  )}
                </View>
                <Ionicons name="chevron-forward-outline" size={18} color="grey" />
              </TouchableOpacity>
            ))}
          </View>

      
          <View className="mt-auto mb-4">
            <Text className="text-center text-gray-500">
              Last sync: {new Date(dateTime).toLocaleString()} {"\n"}
              0 unsynced entries
            </Text>
          </View>
        


        </>
      )}


      {screen !== "View1" && (
        <View >
          {data.find((entry) => entry.item === screen)?.content || (
            <View className="h-full justify-center items-center">
              <TouchableOpacity
            onPress={() => setScreen("View1")}
            className="bg-gray-300 mt-4 px-4 py-2 rounded-lg"
          >
            <Text className="text-gray-700 font-medium">Go Back</Text>
          </TouchableOpacity>
            </View>
            
            
          )}
          
          
        </View>
      )}
    </SafeAreaView>
  );
}