import {Pressable, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppSelector} from '../store/hooks';
import {selectNumberOfItems} from '../redux/slices/CartSlice';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import HomeScreen from '../screen/HomeScreen';
import OrderScreen from '../screen/OrderScreen';
import ProfileScreen from '../screen/ProfileScreen';
import ProductDetailsScreen from '../screen/ProductDetailsScreen';
import MyCartScreen from '../screen/MyCartScreen';
import ThankyouScreen from '../screen/ThankyouScreen';
import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/AuthenticationScreen/LoginScreen';
import SignupScreen from '../screen/AuthenticationScreen/SignupScreen';

import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';

import {useAuthContext} from '../context/AuthContext';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const navigation = useNavigation();

  const numberOfItems = useAppSelector(selectNumberOfItems);

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Your Shop"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Cart')}
              style={{flexDirection: 'row'}}>
              <FontAwesome5 name="shopping-cart" size={18} color="gray" />
              <Text style={{marginLeft: 5, fontWeight: '500'}}>
                {numberOfItems}
              </Text>
            </Pressable>
          ),
        }}
      />
      <HomeStack.Screen
        name="Product Details"
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Cart"
        component={CartNavigator}
        options={{ headerShown: false}}
      />
      <HomeStack.Screen
        name="Thank You"
        component={ThankyouScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        style: {
          borderRadius: 15,
          height: 90,
        },
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          if (
            routeName === 'My Cart' ||
            routeName === 'Product Details' ||
            routeName === 'Cart' ||
            routeName === 'Thank You'
          ) {
            return {display: 'none'};
          }
          return;
        })(route),
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'My Order':
              iconName = 'file-text';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            default:
              break;
          }          
          return <Icon name={iconName} color={color} size={24} />;
        },
      })}
      //barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="My Order" component={OrderScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const CartStack = createNativeStackNavigator();

const CartNavigator = () => {
  const {userid} = useAuthContext();
 
  return (
    <CartStack.Navigator >
      {userid ? (
        <CartStack.Screen name="My Cart" component={MyCartScreen} options={{ headerShown: true}}/>
      ) : (
        <CartStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false}}/>
      )}
    </CartStack.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />  */}
      <Stack.Screen name="HomeScreen" component={RootNavigator} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
