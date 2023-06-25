import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';


import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const[isLoading,setLoading] = useState(false)

  const onHandleSubmit = () => {
    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
    .then(async (res) => {
      console.log("signInWithEmailAndPassword => ",res)
      setLoading(false)
      navigation.goBack();
    })
    .catch((err) => {
      setLoading(false)
      Alert.alert(err.message)
    });


    // firestore()
    //   .collection('tblUser')
    //   .where("email", "==", email)
    //   .where("password", "==", password)
    //   .get()
    //   .then(querySnapshot => {
       
    //     goToNextScreen(
    //       querySnapshot.docs[0]._data.userid,
    //       querySnapshot.docs[0]._data.mobile,
    //       querySnapshot.docs[0]._data.name,
    //     )
    //   });
  };

  // const goToNextScreen = async (userId, mobile, name) => {  
    
  //   setDbUser(userId)

  //   await AsyncStorage.setItem('EMAIL', email);  
  //   await AsyncStorage.setItem('USERID', userId);  
  //   await AsyncStorage.setItem('MOBILE', mobile);  
  //   await AsyncStorage.setItem('NAME', name);  

    

  //   setTimeout(() => {
  //     setLoading(false)
  //    // navigation.goBack();
  //    }, 3000);

   
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Sign In</Text>
      { isLoading  && <ActivityIndicator size={'large'} color={'blue'} /> }
      <View style={styles.loginContainer}>
        <TextInput
          value={email}
          placeholder="Enter Email"
          style={styles.inputText}
          onChangeText={setEmail}
        />
        <View style={{margin: 8}} />
        <TextInput
          value={password}
          placeholder="Enter Password"
          style={styles.inputText}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <View style={{margin: 8}} />

        <TouchableOpacity style={styles.button} onPress={onHandleSubmit}>
          <Text style={{color: '#fff', fontWeight: '500'}}>Submit</Text>
        </TouchableOpacity>

        <View style={{margin: 8}} />

        <View
          style={{
            flexDirection: 'row',
            height: 38,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'blue', fontSize: 16}}>Not an account ? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignupScreen');
            }}>
            <Text style={{color: 'blue', fontWeight: '600', fontSize: 18}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
    backgroundColor: '#fff',
  },
  bigText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    padding: 12,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d1d1',
  },
  inputText: {
    width: 320,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d1d1',
  },
  button: {
    backgroundColor: '#EE5407',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
  },
});
