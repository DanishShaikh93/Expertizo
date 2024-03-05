import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';

import MapView, {Marker} from 'react-native-maps';


export default function ({navigation, route }) {
const {pickup} = route.params;
console.log(pickup)

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const [places, setPlaces]= useState([]);
const [destination, setDestination] = useState();


useEffect(() => {
  (async () => {
    
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


if(!location){
  return <Text>Loading...</Text>
 }


 const searchPlaces = (Text) => {
  setDestination();
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


const getDestinationLocation = (item) => {
setDestination(item);
}

  return (
    <View>

 <Text>Your Pickup Location is {pickup.name} {pickup.location.address}</Text>


 <View>
          <TextInput style={styles.input} placeholder='Search Pickup Location' onChangeText={searchPlaces}></TextInput>
           {!destination &&
            <View>
            {places.map((item , index) => {
              return <TouchableOpacity key={index} onPress={() => getDestinationLocation(item)}>
                <Text>{item.name} {item.location.address}</Text>
              </TouchableOpacity>
            })}   
            </View>
            }

            {destination &&
            <View>
              <Text style={styles.pickupLocation}>Your Destination Location Is {destination.name} {destination.location.address}</Text>
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
        <Button disabled={!destination} style={styles.button} title='Select Fare' onPress={()=> navigation.navigate('select-fare', {pickup, destination} )}/>
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
  },
  input: {
    borderColor: 'black',
    borderWidth: 1, // Remove quotes from 1px
    borderStyle: 'solid',
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    margin: "auto",
  }
});