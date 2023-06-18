import { Pressable,Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { selectNumberOfItems } from '../redux/slices/CartSlice';

import HomeScreen from '../screen/HomeScreen';
import OrderScreen from '../screen/OrderScreen';
import ProfileScreen from '../screen/ProfileScreen';
import ProductDetailsScreen from '../screen/ProductDetailsScreen'

import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {

  const numberOfItems = useSelector(selectNumberOfItems);

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
      name="Your Shop" 
      component={HomeScreen}
      options={{
        headerRight: () => (
          <Pressable
            onPress={() => {}}
            style={{ flexDirection: 'row' }}
          >
            <FontAwesome5 name="shopping-cart" size={18} color="gray" />
            <Text style={{ marginLeft: 5, fontWeight: '500' }}>
              {numberOfItems}
            </Text>
          </Pressable>
        )
      }} />
      <HomeStack.Screen
        name="Product Details"
        component={ProductDetailsScreen}
        options={{ headerShown: false}}
      />
     
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={{ headerShown: false }}
        barStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Foundation name="home" size={24} color={color} />
            ),
                   
          }}
        />
        <Tab.Screen
          name="OrdersTab"
          component={OrderScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="list-alt" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-alt" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  export default RootNavigator;