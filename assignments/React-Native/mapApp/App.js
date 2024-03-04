import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Dashboard from './screens/Dashboard';
import UserPickup from './screens/Pickup';
import UserDestination from './screens/Destination';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='dashboard' component={Dashboard} 
      options={{
        headerShown: 'Home',
      }}
      />

      <Stack.Screen name='user-pickup' component={UserPickup} 
      options={{
        headerTitle: 'User Map',
      }}
      />
      <Stack.Screen name='user-destination' component={UserDestination} 
      options={{
        headerTitle: 'Destination',
      }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
