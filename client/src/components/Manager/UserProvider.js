import React, {createContext} from 'react';

export const UserContext = createContext({ 
    user:  window.sessionStorage.getItem('name'),
    auth: window.sessionStorage.getItem('auth'),
    id: window.sessionStorage.getItem('id')
});

export default function UserProvider (props) {
    const user =  window.sessionStorage.getItem('name');
    const auth = window.sessionStorage.getItem('auth');
    const id = window.sessionStorage.getItem('id');

    return (
      <UserContext.Provider value={{ user, auth, id }}>
        {props.children}
      </UserContext.Provider>
    );
  }