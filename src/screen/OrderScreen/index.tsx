import { FlatList, StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import firestore from '@react-native-firebase/firestore';

import { useIsFocused } from "@react-navigation/native";
import { useAuthContext } from "../../context/AuthContext";

const OrderScreen = () => {
  const isFocused = useIsFocused();
  const { userid } = useAuthContext(); 

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getOrders();
  }, [userid,isFocused]);

  const getOrders = async () => {
   
    const myArray:any = [];

    firestore().collection("tblOrder")
      .where("uid", "==", userid)
      .get()
      .then(snap => {       
          snap.forEach(doc => {
              myArray.push(doc.data())  
          });
          setOrderList(myArray);  
      });
  };

  return (
    <View style={{flex:1,margin:8,alignItems:'center'}}>
      <Text style={styles.header}>My Orders</Text>
      {orderList.length == 0 &&
      <Text  style={{...styles.item,color:'red'}}>You have not order yet</Text>
      }

      {orderList.length > 0 &&
      <FlatList
      data = {orderList}
      renderItem={({item,index}) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={{...styles.item, color:'#374259',fontSize:18}}>{item.name}</Text>
            <Text style={styles.item}>Order Id : {item.orderid}</Text>
            <Text style={styles.item}>Quantity : {item.quantity}</Text>
            <Text style={styles.item}>Price : Rs.{item.price}</Text>
           
          </View>
        )
      }}
      />
       }     
      
    </View>
  )
}

export default OrderScreen


const styles = StyleSheet.create({
  header:{
    color:'black',
    height:42,
    fontSize:24,
    fontWeight:'600',
    margin:16
  },
  itemContainer:{
    borderRadius:12,
    borderColor:'#d1d1d1',
    borderWidth:1,
    margin:2,
    padding:8
  },
  item:{
    color:'#000',
    fontSize:16,
    fontWeight:'500'
  }
})