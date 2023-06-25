import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React,{useEffect, useState} from 'react';
import {useAuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { signOut } from "firebase/auth";
import { auth } from '../AuthenticationScreen/firebase';

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {userid} = useAuthContext();

  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [mobile , setMobile] = useState('')

  useEffect(() => {
    firestore().collection("tblUser")
      .where("uid", "==", userid)
      .get()
      .then(snap => { 
        console.log("user => ",snap.docs) 
        if(snap.docs.length > 0){
          const data = snap.docs[0]._data;
          if(data && data != 'undefined'){
            setName(data.name);     
            setEmail(data.email);     
            setMobile(data.mobile); 
          }
        }  
         
      });
  }, [userid,isFocused]);

 

  const handleLogout = async () => {

    try {
      signOut(auth).then((res) => {
        console.log(res)
        navigation.navigate("Home")
      }).catch((error) => {
        console.log(error.message)
      });

    } catch(e) {
     console.log(e)
    }
   
    
    
  };

  return (
    <View style={{flex: 1, margin: 8, alignItems: 'center'}}>
      <Text style={styles.header}>Profile</Text>

      {userid ? (
        <>
          <View>
            <Text style={styles.item}>Name : {name}</Text>
            <Text style={styles.item}>Mobile No. : {mobile}</Text>
            <Text style={styles.item}>Email : {email}</Text>
          </View>

          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{...styles.item, color: 'red'}}>Please login</Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    color: 'black',
    height: 42,
    fontSize: 24,
    fontWeight: '600',
    margin: 16,
  },
  item: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#EE5407',
    marginTop: 'auto',
    padding: 15,
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});
