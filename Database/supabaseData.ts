import {supabase} from "@/lib/supabase"

export const  insertData = async(reading:{
    sequence_no: number 
    ph : number 
    temperature : number 
    bat_voltage : number 
    err_code : number 
}) => {
    const {data,error} =  await supabase
    
       .from("Data")
       .insert([reading])  ;
       
       if (error){
        console.log(error)
        return ;
       }  
}

export const getData = async() =>{

    const {data,error} = await supabase 
    .from("Data")
    .select("*")
    .order("created_at",{ascending:false})
     if (error) {
    console.error('Fetch Error:', error)
    return []
  }

  return data
}