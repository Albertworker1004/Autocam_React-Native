import React, {createContext, useState} from 'react';

const Context = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{user, setUser}}>{children}</Context.Provider>
  );
};

export {Context, AuthProvider};
