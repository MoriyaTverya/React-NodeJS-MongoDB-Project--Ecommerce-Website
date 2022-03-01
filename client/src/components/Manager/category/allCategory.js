import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function AllCategory() {


       const [list, setList] = useState([]);
       useEffect(async () => //initial  
       {
              let result = await axios.get('http://localhost:3001/category/get');
              console.log(result.data);
              setList(result.data);
       }, []);


       return (
       <div>

              {
                     list.map(item => <div>
                            <h1>{item.categoryName} </h1>
                           {/* {item.masterCategory} */}
                     </div>)
              }
       </div>
       )
}



























  
   
 
