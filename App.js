import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MiniGameScreen from './screens/MiniGameScreen';
import MemoryGameScreen from './screens/MemoryGameScreen';
import LaserGameScreen from './screens/LaserGameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Mimi ile Oyna!',
            headerStyle: { backgroundColor: '#F8F9FA' },
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="MiniGame"
          component={MiniGameScreen}
          options={{
            title: 'Elma Yakalama',
            headerStyle: { backgroundColor: '#F8F9FA' },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="MemoryGame"
          component={MemoryGameScreen}
          options={{
            title: 'Hafıza Oyunu',
            headerStyle: { backgroundColor: '#F8F9FA' },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="LaserGame"
          component={LaserGameScreen}
          options={{
            title: 'Lazer Yakalama',
            headerStyle: { backgroundColor: '#1E1B4B' },
            headerTintColor: '#FFF',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
