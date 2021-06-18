import React, { useEffect, useState } from "react"
import Axios from "axios"
import '../css/Buy.css'
import { useHistory } from "react-router";
function Buy(){
    let history = useHistory();
    const [prodName, setProdName] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [prodBrand, setProdBrand] = useState('');
    useEffect(() => {
        Axios({
            method: "GET",
            url: "http://localhost:2424/buy",
            withCredentials: true,
        })
        .then((res) => {console.log(res.data); return res.data})
        .then((result)=>{
            console.log(result);
            if(result.status === false){
                history.push('/login');
                
            } else{
                result.map((prod, key)=>{
                    setProdName(result.name);
                    setProdPrice(result.price);
                    setProdBrand(result.brand);
                })
                
            }
            
        }).catch((error) =>{console.log(error)});
      })
        return(
            <>
            <div className="unauthorisedMsg">

            </div>
            <div className="detailContainer">
                <h1 className="heading">
                    Thank You for shopping with us!<br/>
                    Your order details are:
                </h1>
                    {<div className="prodDetails">
                        <p>Name: {prodName} </p>
                        <p>Price: ₹{prodPrice} </p>
                        <p>Brand: {prodBrand}</p>
                    </div>}
            </div>
            </>
        )
        
}

export default Buy