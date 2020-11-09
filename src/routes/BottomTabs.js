import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import Dashboard from '../pages/Dashboard';
import Predictions from '../pages/Predictions';
import Feelings from '../pages/Feelings';
import About from '../pages/About';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Navigator
      initialRouteName="Home"      
      tabBarOptions={{
        showLabel: false,
        adaptive: true,
        labelPosition: 'below-icon',
        keyboardHidesTabBar: true,
        allowFontScaling: true,
        safeAreaInsets: { bottom: 0 },
        style: {
          elevation: 0,
          shadowOpacity: 0
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
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name == 'Dashboard') {
            iconName = 'home'
          } else if (route.name == 'Previsões') {
            iconName = 'chart-line'
          } else if (route.name == 'Sentimentos') {
           iconName = 'twitter'
          } else if (route.name == 'Sobre') {
            iconName = 'info-circle'
          }
          return <FontAwesome5 name={iconName} size={20} color={color} />
        }
      })}
    >
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
      <Screen
        name="Previsões"
        component={Predictions}
        options={{
          tabBarLabel: 'Previsões'
        }}
      />
      <Screen
        name="Sobre"
        component={About}
        options={{
          tabBarLabel: 'Sobre'
        }}
      />
    </Navigator>
  );
}

export default BottomTabs;