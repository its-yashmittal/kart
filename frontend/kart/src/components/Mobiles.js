import React from "react";
import { useEffect, useState } from "react"
import { useHistory, NavLink } from "react-router-dom";
import Axios from 'axios'
function Mobiles(){
    const [Mobiles, setMobiles] = useState([]);
    let history = useHistory();
    useEffect(()=>{
        let ignore = false;
        if(!ignore){
            ignore = true;
            Axios({
                method: 'GET',
                url: 'http://localhost:2424/category',
                withCredentials: true,
                params: {category: 'Mobiles'}
            }).then((res)=>{
                console.log('inside the server call promise')
                console.log(res.data);
                setMobiles(res.data);
            }).catch((err)=>{console.log(err)});
        }
    }, [])
    return(
        <div>
            {Mobiles.map((prod, key)=>{
         return(
          <div id={prod._id} key = {key} className="prodCard">
            <p className="prodName">{prod.name}</p>
            <p className="prodPrice">Price: ₹{prod.price}</p> 
            <p className="prodBrand">Brand: {prod.brand}</p> 
            <div className="buttons">
            <NavLink to='/product'>
              <button className="button is-normal" id="viewBtn" onClick={(event)=>{
                var id = event.target.parentElement.parentElement.parentElement.id;
                console.log(id);
                 Axios({
                    method: 'POST',
                    url:"http://localhost:2424/buy",
                    withCredentials: true,
                    data : {'id': id},
                 }).then((res)=>{
                   console.log(res.data);
                    history.push('/product')
                 })}}>View Details</button>
              </NavLink>
              <button className="button is-normal" onClick={(event)=>{
                var id = event.target.parentElement.parentElement.id;
                console.log(id);
                 Axios({
                    method: 'POST',
                    url:"http://localhost:2424/buy",
                    withCredentials: true,
                    data : {'id': id},
                 }).then((res)=>{
                   console.log(res.data);
                    if(res.data.status === false){
                      history.push('/login', {from:'/mobiles'});
                    } else{
                     history.push('/buy');
                    }
                 })}}>
                   BUY
                   </button>
            </div>
          </div>
         )}
       )}
        </div>
    )
}

export default Mobiles