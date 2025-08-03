import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import HomeScreen from './HomeScreen';
import LibraryScreen from './LibraryScreen';
import GestureRecordScreen from './GestureRecordScreen';

const Tab = createBottomTabNavigator();

// Placeholder screens for other tabs
const FavoritesScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
    <Text style={{ fontSize: 18, color: '#2E5BBA' }}>Favorites Screen</Text>
  </View>
);

const HelpScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
    <Text style={{ fontSize: 18, color: '#2E5BBA' }}>Help Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
    <Text style={{ fontSize: 18, color: '#2E5BBA' }}>Profile Screen</Text>
  </View>
);

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2E5BBA',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF80',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, color: focused ? '#FFFFFF' : '#FFFFFF80' }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, color: focused ? '#FFFFFF' : '#FFFFFF80' }}>⭐</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, color: focused ? '#FFFFFF' : '#FFFFFF80' }}>📚</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Record"
        component={GestureRecordScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, color: focused ? '#FFFFFF' : '#FFFFFF80' }}>�</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, color: focused ? '#FFFFFF' : '#FFFFFF80' }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
