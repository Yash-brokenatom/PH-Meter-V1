import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {

  return (
    
    <Tabs 
      screenOptions={{
        animation:'shift',
        headerTransparent:true,
        headerTitleStyle:{fontSize:30 , fontWeight:700 },
        headerTitleAlign:"center",
        tabBarActiveTintColor: "#304FFE",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="Insight"
        options={{
          headerShown:false,
          tabBarIcon: ({ color }) => <MaterialIcons name="insights" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color }) => <Foundation name="results" size={24} color={color} />,
        }}
      />
      <Tabs.Screen name='Connection' options={{
        headerShown:false,
        tabBarIcon:({color})=> <MaterialCommunityIcons name="transit-connection-variant" size={24} color={color} />
      }}/>
      <Tabs.Screen name='More' options={{
        headerShown:false,
        tabBarIcon:({color})=> <Feather name="more-horizontal" size={24} color={color} />
      }}/>
      <Tabs.Screen name='Test' options={{
        headerShown:false,
        tabBarIcon:({color})=> <Feather name="more-horizontal" size={24} color={color} />
      }}/>
    </Tabs>
    
  );
}
