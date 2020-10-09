import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../pages/Dashboard';
import Predictions from '../pages/Predictions';
import Feelings from '../pages/Feelings';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Navigator
      tabBarOptions={{
        adaptive: true,
        labelPosition: 'below-icon',
        keyboardHidesTabBar: true,
        allowFontScaling: true,
        safeAreaInsets: { bottom: 0 },
        style: {
          elevation: 0,
          shadowOpacity: 0,
         
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontSize: 13,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        name="Previsões"
        component={Predictions}
        options={{
          tabBarLabel: 'Previsões'
        }}
      />
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home'
        }}
      />
      <Screen
        name="Sentimentos"
        component={Feelings}
        options={{
          tabBarLabel: 'Sentimentos'
        }}
      />
    </Navigator>
  );
}

export default BottomTabs;