import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = ({navigation}) => {

    setTimeout(() =>{
        navigation.navigate("HomeScreen")
    },2000)

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
        <Image
              source={require('../../../assets/images/splash.jpg')}
              resizeMode='contain'
              style={{width:'100%',height:'100%'}}
            />
      
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})