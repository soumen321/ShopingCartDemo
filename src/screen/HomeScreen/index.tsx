import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image, 
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import ProductItem from '../../component/ProductItem';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import useFetch from '../../apiRequest/fetchApi';
import {fetchProducts} from '../../redux/slices/ProductSlice';
import {WIDTH, insertItems,toCapitalizeFirstLetter} from '../../utils/utils';

import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

const HomeScreen = () => {
  const [indexCheck,setIndexCheck] = useState(0)

  const {items, isLoading, error} = useFetch(
    'https://fakestoreapi.com/products/categories',
  );

  const products = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();

  const newItem = insertItems(items, 0, 'All');

  useEffect(() => {
    fetchProduact('');
  }, [items]);

  const fetchProduact = (cat: string) => {
    dispatch(fetchProducts(cat));
  };

  const onPressCategory = (item: string,index:number) => {
    setIndexCheck(index)
    const category = 0 == index ? '' : `category/${item}` 
    fetchProduact(category);
  };

  return (   
    <View style={styles.container} >    

    {products.products && !isLoading && 
    <View style={{ alignItems: 'center'}}>
      <View >
        <Image
          source={require('../../../assets/images/banner1.jpg')}
          style={styles.bannerImage}
        />
      </View>
      <View style={{height: 45, width: '100%', margin: 4}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={newItem}
          renderItem={({item, index}) => (
            <Pressable
              style={
                indexCheck == index ?
                 {...styles.categoryContainer,backgroundColor:'#FF8551'} :
                {...styles.categoryContainer,backgroundColor:'#ffffff'}
                
              }
              onPress={() => {
                onPressCategory(item,index);                
              }}>
              <Text style={
                 indexCheck == index ?
                 {...styles.text,color:'#ffffff'} :
                {...styles.text,color:'#545B77'}
               
                }>
                {toCapitalizeFirstLetter(item)}
              </Text>
            </Pressable>
          )}
        />
      </View>
      <View style={{marginBottom: 90}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products.products}
          renderItem={({item}) => <ProductItem product={item} />}
        />
      </View>

        

      </View>}
       {isLoading && <View style={styles.loading}>
        <ActivityIndicator size={'large'} color={'blue'}/>
        </View>}
      {products.error && !isLoading && <Text>{products.error}</Text>}


     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    left: 40,
    right: 40,
    top: 40,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerImage: {
    width: WIDTH,
    height: WIDTH * 0.5,
  },
  categoryContainer: {
    height: 40,
    minWidth:100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    alignItems: 'center',
    backgroundColor:'#ffffff',
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
 
});

export default HomeScreen;
