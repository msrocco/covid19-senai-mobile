import { StatusBar } from 'expo-status-bar';
import React from 'react';

import AppStack from './src/routes/AppStack';

export default function App() {
  return (
    <>
      <AppStack />
      <StatusBar backgroundColor="#f5f6fa" hidden={false} style='dark' />
    </>
  );
}
