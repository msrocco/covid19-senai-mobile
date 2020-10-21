import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Tweets from '../pages/Tweets';
import LoadScreen from '../pages/LoadScreen';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }} initialRouteName="LoadScreen" >
        <Screen name="LoadScreen" component={LoadScreen} />
        <Screen name="BottomTabs" component={BottomTabs} />
        <Screen name="Tweets" component={Tweets} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;