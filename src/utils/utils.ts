import { Dimensions } from "react-native";

export const addItemIntoArrayPosition = (arr:[], index:number, item:string) => {
    return [
        ...arr.slice(0, index),     // first half
        item,                       // items to be inserted
        ...arr.slice(index)         // second half
    ];
};

export const toCapitalizeFirstLetter = (item:string='') =>{
    return item.charAt(0).toUpperCase() + item.slice(1)
}

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;