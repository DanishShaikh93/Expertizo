import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default function Dashboard({navigation}) {

    const goToMap = ()=>{
        // console.log(navigation)
        navigation.navigate("user-pickup")
            }

  return (
    <View>
       <TouchableOpacity style={styles.button} onPress={goToMap}>
        <Text style={styles.text}> Open Map </Text>
        </TouchableOpacity>
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
  
