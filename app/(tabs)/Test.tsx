import { View, Text , FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchPreferencesAsync } from '@/Database/Database';

export default function Test() {
  interface EO {
    field: string;
    value: string;
  }

  const [data,setData] = useState<EO[]>([]);
  
  const preference = async()=> {
    const result = await fetchPreferencesAsync();
    if (result){
     setData(result);
    }}
    useEffect(()=>{
      preference();
    },[])


  return (
    <View className='h-full bg-slate-500'>
      <FlatList
      data={data}
      keyExtractor={((item)=>item.field)}
      renderItem={({item})=>(
        <View className=''>
       <Text>
        {item.field}
        {item.value}
       </Text>

        </View>
      )}
      />
    </View>
  )
}