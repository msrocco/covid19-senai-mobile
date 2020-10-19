import { StatusBar } from 'expo-status-bar';
import React from 'react';

import AppStack from './src/routes/AppStack';

export default function App() {
  return (
    <>
      <AppStack />
      <StatusBar backgroundColor="#f5f6fa" translucent={false} hidden={false} style='dark'/>
    </>
  );
}
