import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Camera from './src/components/Camera'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/Home';
import UserCamera from './screens/UserCamera';



const Stack = createNativeStackNavigator();

export default function App() {

//   const [text, setText] = useState();
//   const [list, setList] = useState([]);

// const onChangeText = (text)=> {
// setText(text)
// }

// const addItem = () => {
//   const copyList= [...list];
//   copyList.push(text);
//   setList(copyList);
// }

// const Home = ()=>{
//   return <Text>Homepage</Text>
// }

// const UserCam = ()=>{
//   return <Text>User Camera</Text>
// }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='home' component={Home} 
        options={{
          headerShown: false,
        }}
        />

        <Stack.Screen name='camera' component={UserCamera} 
        options={{
          headerTitle: 'Gallery',
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
//     <View style={styles.container}>
//       <Text>Testing</Text>
//       <Camera/>
//       <StatusBar style="auto" />
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeText}
//         value={text}
//       />

// <Button
//         title="Add Item"
//         color="#f194ff"
//         onPress={addItem}
//       />

//       {list.map((item)=>{

// return <Text>{item}</Text>

//       })}

//     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderColor:'blue',
  },
});
