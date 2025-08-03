/**
 * CASA MIA App
 * 
 * @format
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import MainTabNavigator from './src/screens/MainTabNavigator';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaProvider>
      {!isLoggedIn ? (
        <SplashScreen onLogin={handleLogin} />
      ) : (
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}

export default App;
