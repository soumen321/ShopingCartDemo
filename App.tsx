import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navgation";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () =>{
  return (
    <SafeAreaView style={{flex:1}}>
 <NavigationContainer>
      <RootNavigator/>    
    </NavigationContainer>
    </SafeAreaView>
   
  )
}

export default App;


