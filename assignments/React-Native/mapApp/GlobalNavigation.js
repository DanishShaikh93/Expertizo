import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Dashboard from './screens/Dashboard';
import UserPickup from './screens/Pickup';
import UserDestination from './screens/Destination';
import Fares from './screens/Fares';

const Stack = createNativeStackNavigator();

export default function GlobalNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='dashboard' component={Dashboard} 
      options={{
        headerTitle: 'Dashboard',
      }}
      />

      <Stack.Screen name='user-pickup' component={UserPickup} 
      options={{
        headerTitle: 'User Pickup',
      }}
      />
      <Stack.Screen name='user-destination' component={UserDestination} 
      options={{
        headerTitle: 'User Destination',
      }}
      />
      <Stack.Screen name='select-fare' component={Fares} 
      options={{
        headerTitle: 'Select Fare',
      }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}
