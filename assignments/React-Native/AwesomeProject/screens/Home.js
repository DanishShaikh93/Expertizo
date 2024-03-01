import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, ImageBackground, Image } from 'react-native'
import logo from './images/logo.png'

export default function Home ({navigation}) {

    const goToCam = ()=>{
// console.log(navigation)
navigation.navigate("camera")
    }

    return (
      <ImageBackground source={{ uri: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTExL3Jhd3BpeGVsb2ZmaWNlMTBfYWJzdHJhY3RfY29sb3VyZnVsX2ZlYXRoZXJzX2JhY2tncm91bmRfX2hpbnRfb19iZTkwMjRkZS04YWQ2LTQ2NzYtYmJmMS1jNmIyNmJiY2FkNWJfMS5qcGc.jpg' }} style={styles.container}>
      <View >
      <Image
  style={styles.image}
  source={logo}
  resizeMode="cover"
/>
          <Text style={styles.mainHd}> Capture life's moments with ease using our intuitive camera app. Seamlessly switch between front and rear cameras, apply real-time filters, and snap high-quality photos with just a tap. </Text>
        <TouchableOpacity style={styles.button} onPress={goToCam}>
        <Text style={styles.text}> Open Camera </Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    )
  }

const styles= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000"
    },
    button:{
        backgroundColor: '#000',
        padding: 10,
        textAlign: "center",
       
    },
    text: {
 color: '#fff',
 fontSize: 20,
 textAlign: "center",
    },
    image:{
      height: 200,
      width: 200,
      marginLeft: "auto",
      marginRight: "auto",
    },
    mainHd:{
      color:"#fff",
      fontSize: 16,
      textAlign: "center",
      marginBottom: 20,
      marginTop:20,
    }
})