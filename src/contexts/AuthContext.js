/**
 * src/contexts/AuthContext.js
 */

import '@azure/core-asynciterator-polyfill';
import { useState, useEffect, createContext } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const { user } = useAuthenticator();
  const [ dbUser, setDbUser ] = useState(null);

  const sub = user?.attributes?.sub;
  console.log('user sub: ', sub);

  useEffect(() => {
    async function loadUsr() {
      await DataStore.query(User, (user) => user?.Token.eq(sub)).then((users)=>setDbUser(users[0]));
    }
    loadUsr();
  }, [sub]);

  // useEffect(() => {
  //   DataStore.query(User, (user)=>user?.Token.eq(sub)).then((users) => setDbUser(users[0]));
  // }, [sub]); 

  console.log('dbUser: ', dbUser);

  return(
    <AuthContext.Provider value={{ sub, dbUser, setDbUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
