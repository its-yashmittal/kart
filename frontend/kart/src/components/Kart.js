import React from "react";
import { useEffect, useState } from "react";
import { useHistory} from "react-router-dom"
import Axios from 'axios'
function Kart(){
    let history = useHistory();
    const [apiResponse, setApiResponse] = useState([{message: 'cart empty!'}]);
    var sum = 0;
    useEffect(()=>{
        let ignore = false;
        if(!ignore){
            ignore = true;
            Axios({
                method: 'GET',
                url: 'http://localhost:2424/user',
                withCredentials: true,
            }).then((res)=>{
                console.log(res.data)
            })
              .catch((err)=>{
                  throw err;
              })
            Axios({
                method: 'GET',
                url: 'http://localhost:2424/kart',
                withCredentials: true,
            }).then((res)=>{
                console.log(res.data)
                if(res.data.message) setApiResponse(res.data.message);
                setApiResponse(res.data);
            }).catch((err)=>{throw err});
        }
        
    }, [])
    return(
        <div id="kart">
            <div id="prods" style={{display: "flex", justifyContent: 'center'}}>
            {apiResponse.map((prod, key)=>{
                if(prod.message){
                    return(
                        <div id={key}>
                            <p>{prod.message}</p>    
                        </div>
                    )
                }
                else {
                    console.log(prod[0].name);
                    sum += parseInt(prod[0].price);
                    return(
                        <div id={prod[0]._id} key = {key} className="prodCard">
                    <p className="prodName">{prod[0].name}</p>
                    <p className="prodPrice">Price: ₹{prod[0].price}</p> 
                    <p className="prodBrand">Brand: {prod[0].brand}</p> 
                    </div>
                    )
                }
            })
            }
            </div>
            <div style={{textAlign: 'center'}}>Total Amount: ₹{sum}</div>
            <div style={{display: "flex", justifyContent: 'center'}}>
                <button className="button is-medium" onClick={()=>{
                    alert('order placed successfully');
                    history.push('/')
                    Axios({
                        method: 'GET',
                        url: 'http://localhost:2424/checkout',
                        withCredentials: true
                    }).then((res)=>console.log(res.data)).catch((err)=>{ throw err});
                    } } >
                    Checkout
                </button> 
            </div>
            
        </div>
    )
}

export default Kart