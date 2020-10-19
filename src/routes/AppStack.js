import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Tweets from '../pages/Tweets';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="BottomTabs" component={BottomTabs} />
        <Screen name="Tweets" component={Tweets} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;