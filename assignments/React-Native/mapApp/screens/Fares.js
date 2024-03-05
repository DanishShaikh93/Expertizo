import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default function Fares({route}) {
    // console.log(route)
const {pickup, destination}  = route.params;

  return (
    <View>
        <Text>Your Pickup Location is: {pickup.name} {pickup.location.address}</Text>
        <Text>Your Destination is: {destination.name} {destination.location.address}</Text>
        <Text>Select Fare</Text>
    </View>
  )
}
