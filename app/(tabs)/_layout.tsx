import React from 'react';
import { Tabs } from 'expo-router';
import { Coffee, Accessibility, Target, User, Sparkles, Leaf, UtensilsCrossed } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#444',
        tabBarStyle: {
          backgroundColor: '#050505',
          borderTopColor: '#111',
          paddingTop: 8,
          height: 85,
          paddingBottom: 20,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          marginTop: 4,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Protocol',
          tabBarIcon: ({ color }) => <Coffee size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="body"
        options={{
          title: 'Body Map',
          tabBarIcon: ({ color }) => <Accessibility size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color }) => <Target size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color }) => <Leaf size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="diet"
        options={{
          title: 'Diet',
          tabBarIcon: ({ color }) => <UtensilsCrossed size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="motivation"
        options={{
          title: 'Boost',
          tabBarIcon: ({ color }) => <Sparkles size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
