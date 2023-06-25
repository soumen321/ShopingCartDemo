import {Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {styles} from './style';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import AddRemove from './AddRemove';

const ProductItem = ({product}) => {
  const navigation = useNavigation();
  const {id, title, price, image, category} = product;

  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('Product Details', {id});
      }}>
      <View>
        <Image source={{uri: image}} style={styles.image} resizeMode="center" />
      </View>
      <View style={{padding: 8}}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.price}>Rs. {price}</Text>

        <AddRemove product={product} />
      </View>
      <View style={styles.sideBar}>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={'#FF8551'}
        />
      </View>
    </Pressable>
  );
};

export default ProductItem;
