import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default function Dashboard({navigation}) {

  return (
    <View>
 <Button title='Open Map' onPress={()=> navigation.navigate('user-pickup')}/>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
     backgroundColor: '#000',
     color: '#fff',
     
    },
    text:{
        color: 'red',
        fontSize: 50,
    }
  });
  
