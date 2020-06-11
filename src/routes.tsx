import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './screens/Dashborad';
import Detail from './screens/DetailCountry';
import List from './screens/List';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5'
          }
        }}
      >
        <AppStack.Screen name="Dashboard" component={Dashboard} />
        <AppStack.Screen name="Detail" component={Detail} />
        <AppStack.Screen name="List" component={List} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;