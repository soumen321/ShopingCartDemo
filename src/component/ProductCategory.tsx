import { View, Text,FlatList,Pressable, StyleSheet } from 'react-native'
import React from 'react'
import {toCapitalizeFirstLetter} from '../utils/utils'

const ProductCategory = ({newItem,indexCheck,onPressCategory}) => {
  //const {newItem,indexCheck} = data  
  console.log("cbcfbf"+newItem)
  return (
    <View style={{width: '100%', margin: 6}}>
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
  )
}

export default ProductCategory

const styles = StyleSheet.create({
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
      }
})