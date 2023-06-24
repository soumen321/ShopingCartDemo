import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { useNavigation,useRoute } from '@react-navigation/native';
import { useBackHandler } from '@react-native-community/hooks'

const ThankyouScreen = () => {
  const navigation = useNavigation()
  const route = useRoute();

  const orderid = route?.params?.orderid;

  useBackHandler(() => {
      return true
  })

  return (
    <View style={{flex:1}}>
        <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
        <Text style={{fontSize:24,fontWeight:'500',color:'green',margin:20}}>
        Order place successfully
        </Text>
        <Text style={{fontSize:24,fontWeight:'500',color:'black',margin:20}}>
            Order Id : {orderid}
        </Text>
        </View>
     

        <Pressable onPress={()=>navigation.navigate('Your Shop')} style={styles.button}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </Pressable>
    </View>
  )
}

export default ThankyouScreen

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EE5407',
        marginTop: 'auto',
        padding: 15,
        alignItems: 'center',
        margin: 10,
        borderRadius: 30,
      },
      buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
      },
})