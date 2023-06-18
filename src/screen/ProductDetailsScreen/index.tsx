import {StyleSheet, Text, View, Image, ActivityIndicator, ScrollView} from 'react-native';
import React from 'react';
import AddRemove from '../../component/AddRemove';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {useRoute, useNavigation} from '@react-navigation/native';
import {WIDTH, toCapitalizeFirstLetter} from '../../utils/utils';
import useFetch from '../../apiRequest/fetchApi';

const ProductDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const productId = route?.params?.id;
  // console.log("productId ",productId)

  const {items, isLoading, error} = useFetch(
    `https://fakestoreapi.com/products/${productId}`,
  );

 // console.log('items', items);

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      {items && !isLoading && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.image && (
            <Image
              source={{uri: items.image}}
              style={styles.image}
              resizeMode="center"
            />
          )}

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{items.title}</Text>
            <Text style={styles.cat}>{toCapitalizeFirstLetter(items.category)}</Text>
            <Text style={styles.description}>{items.description}</Text>
            <Text style={styles.price}>${items.price}</Text>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <AddRemove product={items} />
            </View>
          </View>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-circle"
            size={45}
            color="#FF8551"
            style={styles.iconContainer}
          />
        </ScrollView>
      )}
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} color={'blue'} />
        </View>
      )}
      {error && !isLoading && <Text>Something went wrong</Text>}
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 3 / 2,
  },
  detailsContainer: {
    margin: 8,
  },
  title: {
    color: '#374259',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'justify',
    letterSpacing: 0.5,
  },
  cat: {
    color: '#FF8551',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'justify',
  },
  description: {
    color: '#545B77',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'justify',
    letterSpacing: 0.5,
  },
  price: {
    marginVertical: 8,
    color: '#000',
    fontSize: 22,
    fontWeight: '500',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
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
});
