import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default function Fares({navigation , route}) {
    // console.log(route)
const {pickup, destination}  = route.params;

// console.log('pickup', pickup)
// console.log('destination', destination)


const fares={
  bike: 50,
  rickshaw: 80,
}

const calculateFare = (vehicle) =>{
  const {latitude: pickupLat, longitude: pickupLong } = pickup.geocodes.main
  const {latitude: destinationLat, longitude: destinationLong } = destination.geocodes.main

  const distance = calcCrow(pickupLat, pickupLong, destinationLat, destinationLong)

  const fare =fares[vehicle] * distance;
  console.log(distance)
  alert('Rs. ' + fare.toFixed(2))
}


//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) 
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

  return (
    <View>
        <Text>Your Pickup Location is: {pickup.name} {pickup.location.address}</Text>
        <Text>Your Destination is: {destination.name} {destination.location.address}</Text>
        <Text>Select Fare</Text>


<View>
  <Button onPress={() => calculateFare('bike')} title={`Bike | ${fares.bike} Rs. / Km`}/>
  <Button onPress={() => calculateFare('rickshaw')} title={`Rickshaw | ${fares.rickshaw} Rs. / Km`}/>
</View>

    </View>
  )
}
