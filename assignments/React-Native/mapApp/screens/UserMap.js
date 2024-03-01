import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

import MapView from 'react-native-maps';

export default function UserMap({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const goToDashboard = ()=>{
    // console.log(navigation)
    navigation.navigate("dashboard")
        }

  return (
    <View>
         <TouchableOpacity style={styles.button} onPress={goToDashboard}>
        <Text style={styles.text}> Go To Dashboard </Text>
        </TouchableOpacity>

        <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001,
      }}/>
    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 400,
  },
  button: {
   backgroundColor: '#000',
   color: '#fff',
   
  },
  text:{
      color: 'red',
      fontSize: 50,
  }
});