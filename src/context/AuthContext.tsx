import {createContext,useEffect,useState,useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth } from '../screen/AuthenticationScreen/firebase';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) =>{

    const[userid,setUserId] = useState('')
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            console.log("AuthContextProvider => ",user)
            setUserId(user.uid);
          } else setUserId("");
        });
      }, []);

    return (
        <AuthContext.Provider value={{userid}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);