import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    itemContainer:{
      backgroundColor:'#fff',
      flexDirection:'row',
      width:'100%',
      borderRadius:12,
      borderWidth:1,
      borderColor:'#d1d1d1',
      marginVertical:4
    
    },
  
    image:{
      width:'100%',
      height:130,
      aspectRatio:1/1,
      marginVertical:8,
      marginLeft:6,
      borderTopLeftRadius:12,
      borderBottomLeftRadius:12,
    },
  
    title:{
      color:'#374259',
      fontSize:16,    
      fontWeight:'600',
      width:160,
      minHeight:30
    },
    price:{
      marginVertical:8,
      color:'#000',
      fontSize:16,
      fontWeight:'500'
    },
    
   

    sideBar:{
        width: 30,
        backgroundColor: '#FAF0E4',
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        justifyContent:'center'
    }


  
  });