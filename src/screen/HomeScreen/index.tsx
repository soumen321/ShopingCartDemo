import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import ProductItem from '../../component/ProductItem';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import useFetch from '../../apiRequest/fetchApi';
import {fetchProducts} from '../../redux/slices/ProductSlice';
import {WIDTH,HEIGHT, addItemIntoArrayPosition, toCapitalizeFirstLetter} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const userid = '12345'//uuid.v4()
  console.log("huserid =>",userid)
  AsyncStorage.setItem('UID',userid)
  

  const navigation = useNavigation();
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
    <SafeAreaView style={{flex: 1,height:HEIGHT-45}}>
      <View style={styles.container}>
        {products.products && !isLoading && (
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../../assets/images/banner1.jpg')}
              style={styles.bannerImage}
            />

            <View style={{ width: '100%', margin: 6}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={newItem}
                renderItem={({item, index}) => (
                  <Pressable
                    style={
                      indexCheck == index
                        ? {
                            ...styles.categoryContainer,
                            backgroundColor: '#FF8551',
                          }
                        : {
                            ...styles.categoryContainer,
                            backgroundColor: '#ffffff',
                          }
                    }
                    onPress={() => {
                      onPressCategory(item, index);
                    }}>
                    <Text
                      style={
                        indexCheck == index
                          ? {...styles.text, color: '#ffffff'}
                          : {...styles.text, color: '#545B77'}
                      }>
                      {toCapitalizeFirstLetter(item)}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
           
            <FlatList
              showsVerticalScrollIndicator={false}
              data={products.products}
              renderItem={({item}) => <ProductItem product={item} />}
            />
           
          </View>
        )}
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size={'large'} color={'blue'} />
          </View>
        )}
        {products.error && !isLoading && <Text>{products.error}</Text>}

        {cartProducts.products.length > 0 && 
        <Pressable style={styles.bottomView} onPress={() => navigation.navigate('My Cart')}>
        <Text style={styles.buttonText}>Go to Cart</Text>
       </Pressable>
        }  
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    left: 40,
    right: 40,
    top: 40,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: WIDTH,
    height: WIDTH * 0.4,
  },
  categoryContainer: {
    height: 40,
    minWidth: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    marginHorizontal: 4,
    padding: 8,
  },
  text: {
    color: '#545B77',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'justify',
    letterSpacing: 0.5,
  },
  bottomView: {
    width: '28%',
    height: 50,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 5,
    borderRadius: 30,
    marginBottom: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default HomeScreen;
