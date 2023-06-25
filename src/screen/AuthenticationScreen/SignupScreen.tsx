import { Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, } from 'react-native'
import React,{useState} from 'react'
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const SignupScreen = ({navigation}) => {
 // const userid = uuid.v4()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const onHandleSubmit = () => {

    if(name == '' || email == '' || password == ''){
      Alert.alert("Please enter data")
    } else {

        createUserWithEmailAndPassword(auth,email,password)
        .then((response)=>{
          console.log(response.user.email)
          const uid = response.user.uid;
          const email = response.user.email;
          saveUserInfo(uid,email)
        })
        .catch((err)=>{
          Alert.alert("Something went wrong!!")
        })
      
    }

    const saveUserInfo = (uid,email) =>{
     firestore()
        .collection("tblUser")
        .doc(uid)
        .set({
          uid,
          name,
          mobile,
          email
        })
        .then(navigation.goBack())
    }

  }
  return (
    <View style={styles.container}>
    <Text style={styles.bigText}>Sign Up</Text>
    <View style={styles.loginContainer}>
     <TextInput
        value={name}
        placeholder="Enter Name"
        style={styles.inputText}
        onChangeText={setName}
      />
      <View style={{margin: 8}} />
      <TextInput
        value={mobile}
        placeholder="Enter Mobile"
        style={styles.inputText}
        onChangeText={setMobile}
      />
      <View style={{margin: 8}} />
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

      
    </View>
  </View>
  )
}

export default SignupScreen

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
})