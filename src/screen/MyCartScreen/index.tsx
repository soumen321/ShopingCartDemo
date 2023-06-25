import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAppSelector, useAppDispatch} from '../../store/hooks';
import ProductItem from '../../component/ProductItem';
import {useNavigation} from '@react-navigation/native';

import {selectTotalPrice} from '../../redux/slices/CartSlice';
import {clearCart} from '../../redux/slices/CartSlice';
import {useAuthContext} from '../../context/AuthContext';

const MyCartScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {userid} = useAuthContext();
  const dispatch = useAppDispatch();

  const products = useAppSelector(state => state.cart);
  const totalPrice = useAppSelector(selectTotalPrice);

  const placeOrder = async () => {
    setLoading(true);
    const p = products.products;

    const orderid = Math.floor(Math.random() * 1000000 + 1);

    const db = firestore();

    try {
      const batch = db.batch();
      p.forEach(itm => {
        const docRef = db.collection('tblOrder').doc();
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
        setLoading(false);
        dispatch(clearCart());
        navigation.navigate('Thank You', {orderid: orderid});
      });
    } catch (err) {
      console.log('Error : ' + err);
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        margin: 6,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {products.products.length > 0 ? (
        <>
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
        </>
      ) : (
        <Text
          style={{
            color: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Cart is empty
        </Text>
      )}

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} color={'blue'} />
        </View>
      )}
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
