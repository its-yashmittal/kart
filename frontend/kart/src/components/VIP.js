import "bulma/css/bulma.min.css"
import '../css/Shop.css';
import prodImg from '../images/pic1.webp'
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from "react-router-dom"
import Axios from 'axios'
function VIPLounge(){
  let history = useHistory();
  const [apiResponse, setApiResponse] = useState([]); 
  useEffect(()=>{
    let ignore = false;
    if(!ignore){
      fetch("http://localhost:2424/products")
    .then(res => res.json())
    .then((result)=>{
      console.log(result);
      setApiResponse(result);
      ignore = true;
    },
      (error) =>{console.log(error);});
    }
    
  }, [])
  return(
    <div>
      <div className="greeting"> 
        
        <h3>Currently Available Products Are Listed Below</h3>
      </div>
      
       <div className="prodContainer">
       {apiResponse.map((prod, key)=>{
           if(prod.audience === 'VIP'){
            document.getElementById('noOffers').style.visibility = 'hidden'
           return(
          <div id={prod._id} key = {key} className="prodCard">
            <img src={prodImg} style={{width: '50%'}} alt="prodImg"/>
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
                    url:"http://localhost:2424/kart",
                    withCredentials: true,
                    data : {'id': id},
                 }).then((res)=>{
                   console.log(res.data);
                    if(res.data.status === false){
                      history.push('/login', {from: '/'});                    
                    } else{
                     history.push('/kart');
                    }
                 })}}>
                   BUY NOW
                   </button>
                   <button className="button is-normal" onClick={(event)=>{
                var id = event.target.parentElement.parentElement.id;
                console.log(id);
                 Axios({
                    method: 'POST',
                    url:"http://localhost:2424/kart",
                    withCredentials: true,
                    data : {'id': id},
                 }).then((res)=>{
                   console.log(res.data);
                    if(res.data.status === false){
                      history.push('/login', {from : '/shop'});                    
                    } else{
                      alert('added the product to cart');
                     history.push('/shop');
                    }
                 })}}>
                   Add to Kart
                   </button>
            </div>
          </div>
         )}
       })}
        <div id="noOffers">
          No VIP Offers are available as of now!
        </div>
       </div>
    </div>
  );
  };

export default VIPLounge

