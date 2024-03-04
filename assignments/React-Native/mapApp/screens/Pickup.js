import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

import MapView, {Marker} from 'react-native-maps';

export default function UserPickup({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces]= useState([]);
  const [pickup, setPickup] = useState();

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

    
      Location.watchPositionAsync({
      accuracy: Location.Accuracy.High,
      distanceInterval: 1,
      timeInterval: 1000
      }, (location) => {
// console.log('Location', location)
setLocation(location);
      })


  // let location = await Location.getCurrentPositionAsync({});
  // console.log('Location', location)
  // setLocation(location);
     
    })();
  }, []);

// console.log(location)

 if(errorMsg){
  return <Text>{errorMsg}</Text>
 }

 if(!location){
  return <Text>Loading...</Text>
 }

  const goToDashboard = ()=>{
    // console.log(navigation)
    navigation.navigate("dashboard")
        }


  const searchPlaces = (Text) => {
    setPickup();
console.log(Text)

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'fsq3nFAD3ZQc0IAfM3nR6T9kV7D1tQ8dM/53YA3/8gH5dKY='
  }
};

const {latitude, longitude} = location.coords;

fetch(`https://api.foursquare.com/v3/places/search?query=${Text}&ll=${latitude},${longitude}&radius=3000`, options)
  .then(response => response.json())
  .then(response => {console.log(response) 
  setPlaces(response.results)
  })
  .catch(err => console.error(err));

  }    
  
  
  const getPickupLocation = (item) => {
setPickup(item);
  }

  return (
    <View>
         <TouchableOpacity style={styles.button} onPress={goToDashboard}>
        <Text style={styles.text}> Go To Dashboard </Text>
        </TouchableOpacity>


        <View>
          <TextInput placeholder='Search Pickup Location' onChangeText={searchPlaces}></TextInput>
           {!pickup &&
            <View>
            {places.map((item , index) => {
              return <TouchableOpacity key={index} onPress={() => getPickupLocation(item)}>
                <Text>{item.name} {item.location.address}</Text>
              </TouchableOpacity>
            })}   
            </View>
            }

            {pickup &&
            <View>
              <Text style={styles.pickupLocation}>Your Pickup Location Is {pickup.name} {pickup.location.address}</Text>
            </View>
            }

        </View>

        <View>
      <MapView style={styles.map} initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001,
      }}>

<Marker 
coordinate={{
  latitude: location.coords.latitude,
        longitude: location.coords.longitude,
}}
title={"Your Location"}
description={"My Home"}
/>

        </MapView>
        <Button disabled={!pickup} style={styles.button} title='Select Destination' onPress={() => navigation.navigate('user-destination', {pickup}) }/>
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
    height: '70%',
  },
  button: {
   backgroundColor: '#000',
   color: '#fff',
   fontSize: 20,
  },
  text:{
      color: 'red',
      fontSize: 50,
  },
  pickupLocation:{
    color: "red",
  }
});