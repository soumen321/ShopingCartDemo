import { Image, View } from 'react-native'

const SplashScreen = ({navigation}) => {

  setTimeout(() => {
   navigation.navigate("HomeScreen")
  }, 3000);
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