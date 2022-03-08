import React, {createContext} from 'react';

const data={
  userValue:{id:''},
set_userValue:()=>{}
};

export const UserContext = createContext({data});

// export default function UserProvider (props) {
//     // const user =  window.sessionStorage.getItem('name');
//     // const auth = window.sessionStorage.getItem('auth');
//     // const id = window.sessionStorage.getItem('id');
//     // const innerAuth = window.sessionStorage.getItem('innerAuth');

//     return (
//       <UserContext.Provider value={{ value:props.value,set:props.set}}>
//         {props.children}
//       </UserContext.Provider>
//     );
//   }
   export default UserContext;

  