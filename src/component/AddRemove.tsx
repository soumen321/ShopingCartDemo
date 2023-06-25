import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import { changeQuantity,addToCart } from '../redux/slices/CartSlice';


const AddRemove = ({product}) => {

  const dispatch = useAppDispatch()

  const addItemToCart = () =>{
    dispatch(addToCart({product}))
  }
  const increaseQuantity = () =>{
    dispatch(changeQuantity({
      productId: product.id,
      qnty:1
    }))
  }
  const decreaseQuantity = () =>{
    dispatch(changeQuantity({
      productId: product.id,
      qnty:-1
    }))
  }
  const cartProducts = useAppSelector(state => state.cart);

  const cartProduct = cartProducts.products.find((p) => p.id == product.id)

  return (
    <View >
      {cartProduct && (
        <View style={{flexDirection: 'row', marginVertical: 8}}>
          <Pressable style={styles.btnOpearation} onPress={decreaseQuantity}>
            <Text style={styles.btn}>-</Text>
          </Pressable>

          <Text style={styles.text}>{cartProduct?.quantity}</Text>

          <Pressable style={styles.btnOpearation} onPress={increaseQuantity}>
            <Text style={styles.btn}>+</Text>
          </Pressable>
        </View>
      )}
      {!cartProduct && (
        <View style={{marginVertical: 8}}>
          <Pressable style={styles.btnAdd} onPress={addItemToCart}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default AddRemove;

const styles = StyleSheet.create({
  btnOpearation: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    width: 50,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  btn: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
  btnAdd: {
    width: 100,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#545B77',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'justify',
    letterSpacing: 0.5,
  },
});
