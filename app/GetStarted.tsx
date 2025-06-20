import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  setupDatabase,
  insertPreference,
  updateData,
  fetchPreferencesAsync,
} from "@/Database/Database";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import index from ".";
import DropDownPicker from "react-native-dropdown-picker";
type OptionType = string | { type: "jsx"; value: JSX.Element };
export default function GetStarted() {
  const navigation = useNavigation<NavigationProp<any>>();
  useEffect(() => {
    setupDatabase();
  }, []);

  const send = async (field: string, value: string) => {
    try {
      setSelectedOptions((prev) => ({ ...prev, [field]: value }));

      const storedPreference: any = await fetchPreferencesAsync();

      if (storedPreference[field] !== value) {
        await insertPreference(field, value);
        setData(true);
      } else {
        await updateData(field, value);
        console.log("Updated preference:", field, value);
      }
    } catch (error) {
      console.error("Error in send function:", error);
    }
  };


  const scrollToNext = () => {
    const currentBoard = onBoard[activeIndex];

    if (
      currentBoard &&
      currentBoard.Option &&
      currentBoard.Option.length > 0 &&
      !data
    ) {
      alert("Please select an option before continuing");
    } else {
      if (activeIndex < onBoard.length - 1) {
        const nextIndex = activeIndex + 1;
        flatListRef.current?.scrollToIndex({ index: nextIndex });
        setActiveIndex(nextIndex);
        setData(false);
      } else {
        navigation.navigate("Login");
      }
    }
  };

  type DropDownState = {
    [key: string]: {
      open: boolean;
      value: string | null;
      items: { label: string; value: string }[];
    };
  };
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const screenWidth = Dimensions.get("window").width;
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    age: "",
    weight: "",
    water: "",
  });
  const [dropdown, setDropdown] = useState<DropDownState>({
    gender: {
      open: false,
      value: null,
      items: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    diet: {
      open: false,
      value: null,
      items: [
        { label: "NV", value: "NV" },
        { label: "Veg", value: "Veg" },
        { label: "Vegan", value: "Vegan" },
      ],
    },
    drinks: {
      open: false,
      value: null,
      items: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    smoker: {
      open: false,
      value: null,
      items: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    alcohol: {
      open: false,
      value: null,
      items: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
  });
  useEffect(() => {
    // Track all dropdown values
    if (dropdown.gender.value) send("Gender", dropdown.gender.value);
    if (dropdown.diet.value) send("Diet Type", dropdown.diet.value);
    if (dropdown.drinks.value) send("Sweet Drinks", dropdown.drinks.value);
    if (dropdown.smoker.value) send("Smoker", dropdown.smoker.value);
    if (dropdown.alcohol.value) send("Alcohol", dropdown.alcohol.value);
  }, [
    dropdown.gender.value,
    dropdown.diet.value,
    dropdown.drinks.value,
    dropdown.smoker.value,
    dropdown.alcohol.value,
  ]);

  useEffect(() => {
    send("Name", form.name);
    send("Age", form.age);
    send("Weight", form.weight);
    send("Daily Water Intake", form.water);
  }, [form]);

  const updateDropDown = (
    name: string,
    key: "open" | "value" | "items",
    value: any
  ) => {
    setDropdown((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        [key]: value,
      },
    }));
  };
  const onBoard = [
    {
      Question:
        "Do you consent to provide your health details for customized reports?",
      Option: ["Yes, I Consent", "No, Skip Questionnaire"],
    },
    {
      Question: "Tell us about yourself",
      Option: [
        {
          type: "jsx",
          value: (
            <SafeAreaView className=" h-full px-2  gap-4">
              <View className="gap-4">
                <Text>Full Name</Text>
                <TextInput
                  value={form.name}
                  onChangeText={(text) => {
                    setForm((prev) => ({ ...prev, name: text }));
                    send("Name", text);
                  }}
                  placeholder="Full Name"
                  className="h-10 bg-[#D9D9D94D] border border-[#0000001A] rounded-lg px-3 text-black"
                />
              </View>

              <View className="flex-row justify-between gap-5">
                <View className="flex-1 gap-3">
                  <Text>Age</Text>
                  <TextInput
                    value={form.age}
                    onChangeText={(text) => {
                      setForm((prev) => ({ ...prev, age: text }));
                    }}
                    placeholder="Age"
                    className="bg-[#D9D9D94D] border border-[#0000001A] rounded-lg p-3"
                    keyboardType="numeric"
                  />
                </View>
                <View
                  className="flex-1 gap-3"
                  style={{ zIndex: dropdown.gender.open ? 2000 : 100 }}
                >
                  <Text>Gender</Text>
                  <DropDownPicker
                    style={{
                      borderColor: "#0000001A",
                      backgroundColor: "#D9D9D94D",
                    }}
                    open={dropdown.gender.open}
                    value={dropdown.gender.value}
                    items={dropdown.gender.items}
                    setOpen={(open) => updateDropDown("gender", "open", open)}
                    setValue={(callback) =>
                      updateDropDown(
                        "gender",
                        "value",
                        typeof callback === "function"
                          ? callback(dropdown.gender.value)
                          : callback
                      )
                    }
                    setItems={(items) =>
                      updateDropDown("gender", "items", items)
                    }
                    placeholder="Select Gender"
                  />
                </View>
              </View>

              <View className="flex-row gap-5">
                <View className="flex-1 gap-3">
                  <Text>Weight(kg)</Text>
                  <TextInput
                    value={form.weight}
                    onChangeText={(text) => {
                      setForm((prev) => ({ ...prev, weight: text }));
                      send("Weight", text);
                    }}
                    placeholder="50"
                    className="bg-[#D9D9D94D] border border-[#0000001A] rounded-lg p-3"
                    keyboardType="numeric"
                  />
                </View>
                <View className="flex-1 gap-3">
                  <Text>Daily Water Intake</Text>
                  <TextInput
                    value={form.water}
                    onChangeText={(text) => {
                      setForm((prev) => ({ ...prev, water: text }));
                      send("Daily Water Intake", text);
                    }}
                    placeholder="4 Liters"
                    className="bg-[#D9D9D94D] border border-[#0000001A] rounded-lg p-3"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View className="flex-row gap-5">
                <View
                  className="flex-1 gap-3"
                  style={{ zIndex: dropdown.diet.open ? 2000 : 100 }}
                >
                  <Text>Diet Type</Text>
                  <DropDownPicker
                    style={{
                      borderColor: "#0000001A",
                      backgroundColor: "#D9D9D94D",
                    }}
                    open={dropdown.diet.open}
                    value={dropdown.diet.value}
                    items={dropdown.diet.items}
                    setOpen={(open) => updateDropDown("diet", "open", open)}
                    setValue={(callback) =>
                      updateDropDown(
                        "diet",
                        "value",
                        typeof callback === "function"
                          ? callback(dropdown.diet.value)
                          : callback
                      )
                    }
                    setItems={(items) => updateDropDown("diet", "items", items)}
                  />
                </View>
                <View
                  className="flex-1 gap-3"
                  style={{ zIndex: dropdown.drinks.open ? 2000 : 100 }}
                >
                  <Text>Sweet Drinks</Text>
                  <DropDownPicker
                    style={{
                      borderColor: "#0000001A",
                      backgroundColor: "#D9D9D94D",
                    }}
                    open={dropdown.drinks.open}
                    value={dropdown.drinks.value}
                    items={dropdown.drinks.items}
                    setOpen={(open) => updateDropDown("drinks", "open", open)}
                    setValue={(callback) =>
                      updateDropDown(
                        "drinks",
                        "value",
                        typeof callback === "function"
                          ? callback(dropdown.drinks.value)
                          : callback
                      )
                    }
                    setItems={(items) =>
                      updateDropDown("drinks", "items", items)
                    }
                  />
                </View>
              </View>

              <View className="flex-row gap-5">
                <View
                  className="flex-1 gap-3"
                  style={{ zIndex: dropdown.smoker.open ? 2000 : 100 }}
                >
                  <Text>Smoker</Text>
                  <DropDownPicker
                    style={{
                      borderColor: "#0000001A",
                      backgroundColor: "#D9D9D94D",
                    }}
                    open={dropdown.smoker.open}
                    value={dropdown.smoker.value}
                    items={dropdown.smoker.items}
                    setOpen={(open) => updateDropDown("smoker", "open", open)}
                    setValue={(callback) =>
                      updateDropDown(
                        "smoker",
                        "value",
                        typeof callback === "function"
                          ? callback(dropdown.smoker.value)
                          : callback
                      )
                    }
                    setItems={(items) =>
                      updateDropDown("smoker", "items", items)
                    }
                  />
                </View>
                <View
                  className="flex-1 gap-3"
                  style={{ zIndex: dropdown.alcohol.open ? 2000 : 100 }}
                >
                  <Text>Alcohol</Text>
                  <DropDownPicker
                    style={{
                      borderColor: "#0000001A",
                      backgroundColor: "#D9D9D94D",
                    }}
                    open={dropdown.alcohol.open}
                    value={dropdown.alcohol.value}
                    items={dropdown.alcohol.items}
                    setOpen={(open) => updateDropDown("alcohol", "open", open)}
                    setValue={(callback) =>
                      updateDropDown(
                        "alcohol",
                        "value",
                        typeof callback === "function"
                          ? callback(dropdown.alcohol.value)
                          : callback
                      )
                    }
                    setItems={(items) =>
                      updateDropDown("alcohol", "items", items)
                    }
                  />
                </View>
              </View>
            </SafeAreaView>
          ),
        },
      ],
    },
    {
      Question: "Do you have any existing health conditions?",
      Option: [
        "Any Cancer Type",
        "Diabetes",
        "Gout",
        "Heart Problems",
        "Chronic Kidney Disease",
        "Urinary Tract Infection (UTI)",
        "Any Other",
      ],
    },
    { Question: "Tell us something about your use of Smart pH" },
    {
      Question:
        "Do you want to track your general fitness after a change in lifestyle (e.g., food or exercise)?",
      Option: ["Yes", "No"],
    },
    {
      Question:
        "Do you want to track the acidity or alkalinity of your body and receive interpreted reports",
      Option: ["Yes", "No"],
    },
    {
      Question: "Do you want to measure your urine pH levels?",
      Option: ["Yes", "No"],
    },
    {
      Question: "How often do you plan to use the device?",
      Option: ["Daily (Single)", "Daily (Multiple)", "Weekly", "Monthly"],
    },
    {
      Question: "Would you like to receive reminders for pH checks?",
      Option: ["Yes", "No"],
    },
  ];

  
  useEffect(() => {
    if (Object.values(selectedOptions).includes("No, Skip Questionnaire")) {
      navigation.navigate("Login");
    }
  }, [selectedOptions]);
  

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <View style={{ height: "100%", padding: 20, gap: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate("index")}>
          <Ionicons
            style={{
              backgroundColor: "#304FFE",
              height: 40,
              width: 40,
              textAlign: "center",
              textAlignVertical: "center",
              borderRadius: 10,
            }}
            name={"chevron-back-outline"}
            size={30}
            color={"white"}
          />
        </TouchableOpacity>
        <View>
          <FlatList
            ref={flatListRef}
            data={onBoard}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.Question}
            renderItem={({ item }) => (
              <View
                style={{
                  width: screenWidth - 50,
                  marginHorizontal: 5,
                  justifyContent: "flex-start",
                  gap: 20,
                }}
              >
                <Text className="text-4xl text-center font-semibold">
                  {item.Question}
                </Text>
                {item.Option ? (
                  <FlatList
                    pagingEnabled
                    data={item.Option as OptionType[]}
                    keyExtractor={(option) =>
                      typeof option === "string" ? option : `custom-${index}`
                    }
                    renderItem={({ item: option }) =>
                      typeof option === "string" ? (
                        <TouchableOpacity
                          onPress={() => send(item.Question, option)}
                          className="rounded-xl p-3  border"
                          style={{
                            borderColor: "#0000001A",
                            marginTop: "6%",
                            zIndex: 100,
                            backgroundColor:
                              selectedOptions[item.Question] === option
                                ? "#304FFE"
                                : "#D9D9D94D",
                          }}
                        >
                          <Text
                            className="text-center text-lg"
                            style={{
                              color:
                                selectedOptions[item.Question] === option
                                  ? "white"
                                  : "#8A8A8A",
                            }}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        option.value
                      )
                    }
                  />
                ) : null}
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => scrollToNext()}
            className="bg-[#304FFE] rounded-xl p-4 mt-5"
          >
            <Text className="text-center text-white text-2xl">Continue</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              opacity: activeIndex === 3 ? 0 : 1,
            }}
          >
            {onBoard.map((_, index) => (
              <View
                key={index}
                style={{
                  width: activeIndex === index ? 15 : 30,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:
                    activeIndex === index ? "#304FFE" : "#D3D3D3",
                  marginHorizontal: 5,
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}