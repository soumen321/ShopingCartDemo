import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  BackHandler,
  FlatList,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import ProductItem from '../../component/ProductItem';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import useFetch from '../../apiRequest/fetchApi';
import {fetchProducts} from '../../redux/slices/ProductSlice';
import {HEIGHT, addItemIntoArrayPosition} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';

import {styles} from './style';
import ProductCategory from '../../component/ProductCategory';
const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        console.log(e);
        //e.preventDefault();
        BackHandler.exitApp();
        return;
      }),
    [navigation],
  );

  const [indexCheck, setIndexCheck] = useState(0);

  const {items, isLoading, error} = useFetch(
    'https://fakestoreapi.com/products/categories',
  );
  const cartProducts = useAppSelector(state => state.cart);
  const products = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();

  const newItem = addItemIntoArrayPosition(items, 0, 'All');

  useEffect(() => {
    fetchProduact('');
  }, [items]);

  const fetchProduact = (cat: string) => {
    dispatch(fetchProducts(cat));
  };

  const onPressCategory = (item: string, index: number) => {
    setIndexCheck(index);
    const category = 0 == index ? '' : `category/${item}`;
    fetchProduact(category);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        {products.products && !isLoading && (
          <>
            <ProductCategory
              newItem={newItem}
              indexCheck={indexCheck}
              onPressCategory={onPressCategory}
            />

            <FlatList
              contentContainerStyle={{paddingBottom: 55}}
              showsVerticalScrollIndicator={false}
              data={products.products}
              renderItem={({item}) => <ProductItem product={item} />}
            />
          </>
        )}
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size={'large'} color={'blue'} />
          </View>
        )}
        {products.error && !isLoading && <Text>{products.error}</Text>}

        {cartProducts.products.length > 0 && (
           <Pressable
           style={styles.bottomView}
           onPress={() => navigation.navigate('Cart')}>
           <Text style={styles.buttonText}>Go to Cart</Text>
         </Pressable> 
        )}
       
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
