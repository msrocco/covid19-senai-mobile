import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import { useFonts } from 'expo-font';
import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';

import AppStack from './src/routes/AppStack';

export default function App() {

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <>
      {/* <View style={{ backgroundColor: '#f5f6fa', flex: 0, height: 40 }}>
        <StatusBar backgroundColor="#f5f6fa" translucent={false} hidden={true} style='dark' />
      </View> */}
      <AppStack />
    </>
  );
}
