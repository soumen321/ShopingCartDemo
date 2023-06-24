import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect,useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAppSelector, useAppDispatch} from '../../store/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductItem from '../../component/ProductItem';
import {useNavigation} from '@react-navigation/native';

import {selectTotalPrice} from '../../redux/slices/CartSlice';
import {clearCart} from '../../redux/slices/CartSlice';

const MyCartScreen = () => {
  const[loading,setLoading] = useState(false)
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const products = useAppSelector(state => state.cart);
  const totalPrice = useAppSelector(selectTotalPrice);

  //console.log("cartProduct123 ",cartProducts)

  //   async function massDeleteUsers() {
  //     // Get all users
  //     const usersQuerySnapshot = await firestore().collection('cart').get();

  //     // Create a new batch instance
  //     const batch = firestore().batch();

  //     usersQuerySnapshot.forEach(documentSnapshot => {
  //       batch.delete(documentSnapshot.ref);
  //     });

  //     return batch.commit();
  //   }

  //   const syncCartItem = async () =>{
  //     const userid = await AsyncStorage.getItem('UID');
  //     console.log("userid =>",userid)

  //     const p = cartProducts.products
  //     const db = firestore();

  //     try {
  //       const batch = db.batch();
  //       p.forEach((itm) => {
  //         const docRef = db.collection('cart').doc();
  //         batch.set(docRef, {
  //           uid:userid,
  //           productid: itm.id,
  //           name: itm.title
  //         });
  //       });
  //       batch.commit().then((results) => {
  //         console.log('cart added');
  //       });
  //     } catch (err) {
  //       console.log('Error : ' + err);
  //     }

  // }

  //   useEffect(() =>{
  //     massDeleteUsers().then(() => console.log('All users deleted in a single batch operation.'))
  //     .then(()=>syncCartItem())
  //     .then(() => fetchCartItem())

  //   },[])

  //   const fetchCartItem= async ()=>{
  //     const userid = await AsyncStorage.getItem('UID');
  //     console.log("getFireStoreProduct 453 ",userid)
  //     firestore().collection("cart")
  //     .where("uid", "==", userid)
  //     .get()
  //     .then(snap => {
  //         snap.forEach(doc => {
  //             console.log("firestore ",doc.data());
  //         });
  //     });
  //   }

  const placeOrder = async () => {
    setLoading(true)
    const userid = await AsyncStorage.getItem('UID');
    const p = products.products;

    const orderid = Math.floor(Math.random() * 1000000 + 1);

    const db = firestore();

    try {
      const batch = db.batch();
      p.forEach(itm => {
        const docRef = db.collection('order').doc();
        batch.set(docRef, {
          uid: userid,
          orderid: orderid,
          productid: itm.id,
          name: itm.title,
          quantity: itm.quantity,
          price: itm.price,
        });
      });
      batch.commit().then(results => {
        console.log('cart added');
        setLoading(false)
        dispatch(clearCart());
        navigation.navigate('Thank You', {orderid: orderid});
      });
    } catch (err) {
      console.log('Error : ' + err);
      setLoading(false)
    }
  };

  useEffect(() => {
    // console.log("getFireStoreProduct 453")
    //   firestore()
    //    .collection('cart')
    //    .where('uid', '==', "44395afb-785d-44ee-8892-6e62ab912e6c")
    //    //.doc('3ImePhXbYOJXp0BB3AMf')
    //    .get().then((snapshot) => console.log("getFireStoreProduct",snapshot));
  }, []);

  return (
    <View style={{flex: 1, margin: 6}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products.products}
        renderItem={({item}) => <ProductItem product={item} />}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
          marginTop: 'auto',
        }}>
        <Text style={{fontSize: 20, color: 'black'}}>Total Amout - </Text>
        <Text style={{fontSize: 20, color: 'black'}}>
          Rs . {totalPrice.toFixed(2)}
        </Text>
      </View>

      <Pressable onPress={placeOrder} style={styles.button}>
        <Text style={styles.buttonText}>Place Order</Text>
      </Pressable>

      {loading && <View style={styles.loading}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>}
    </View>
  );
};

export default MyCartScreen;

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
  loading: {
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
