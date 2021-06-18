import React from "react";
import '../css/Product.css'
import prodImg from '../images/pic1.webp'
import {useState, useEffect} from "react"
import Axios from "axios"
import { useHistory } from 'react-router'
function Product(){
    let history = useHistory();
    const [id, setId] = useState('');
    const [prodName, setProdName] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [prodBrand, setProdBrand] = useState('');
    const [prodColor, setProdColor] = useState('');
    const [prodCategory, setProdCategory] = useState('');
    const [prodDescription, setProdDescription] = useState('');
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
                var unauthorisedMsg = document.getElementById('unauthorisedMsg');
                unauthorisedMsg.innerText = result.message;
                
            } else{
                setProdName(result.name);
                setProdPrice(result.price);
                setProdBrand(result.brand);
                setProdColor(result.color);
                setProdDescription(result.description);
                setProdCategory(result.category);
                setId(result._id);
            }
            
        }).catch((error) =>{console.log(error)});
      })
    return(
        <div className="container">
            <div className="topSection">
             <div className="leftSection ">
                    <img src={prodImg} alt="prod img" style={{alignContent:'center', width: '100%'}} />
                </div>
                <div className="rightSection">
                    {<div className="productInfo" >
                        <div>{prodName} </div>
                        <div>By: {prodBrand}</div>
                        <div>Color: {prodColor}</div>
                        <div>Category: {prodCategory}</div>
                    </div>}
                    <hr style={{color: 'black', backgroundColor: 'black'}}/>
                    {<div className="priceDetails">
                        <p>MRP: ₹{prodPrice}</p>
                        <p>Discount: ₹0</p>
                        <p>Price: ₹{prodPrice} , inclusive of all taxes</p>
                        <ol>
                            Available Offers: <br />
                            No offers are available right now
                        </ol>
                    </div>}
                    <div className="deliveryDetails">
                        <span>InStock </span>
                        <span>1 Year Warranty </span>
                        <span>7 Day Delivery </span>
                        <span>Quality Assured </span>
                    </div>
                    <button className="button is-normal" onClick={(event)=>{
                console.log(id);
                 Axios({
                    method: 'POST',
                    url:"http://localhost:2424/kart",
                    withCredentials: true,
                    data : {'id': id},
                 }).then((res)=>{
                   console.log(res.data);
                    if(res.data.status === false){
                      history.push('/login');                    
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
                      history.push('/login');                    
                    } else{
                      alert('added the product to cart');
                     history.push('/shop');
                    }
                 })}}>
                   Add to Kart
                   </button> 
                </div>                
            </div>
            <hr style={{color: 'black', backgroundColor: 'black'}}/>
            <div className="productDescription">
                <h4 style={{fontSize:'15pt'}}>• About this item</h4>
                <p>{prodDescription}
                </p>
            </div>
            <div className="reviewSection">
            <h4 style={{fontSize:'15pt'}}>• Review Section:</h4>
                <ol>
                    <li>
                        Random User 1:
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur elit ante, molestie commodo dui varius non. Phasellus quis augue a mauris fermentum tincidunt at vel arcu. Integer at magna vitae arcu tempus pretium. Phasellus viverra luctus varius. Aliquam vulputate mi sit amet tellus tincidunt porttitor in at urna. Praesent sed ante semper, ullamcorper enim ac, efficitur lacus. Etiam quis porttitor est, vitae ullamcorper sem. 
                        </p>
                    </li>
                    <li>
                        Random User 2:
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur elit ante, molestie commodo dui varius non. Phasellus quis augue a mauris fermentum tincidunt at vel arcu. Integer at magna vitae arcu tempus pretium. Phasellus viverra luctus varius. Aliquam vulputate mi sit amet tellus tincidunt porttitor in at urna. Praesent sed ante semper, ullamcorper enim ac, efficitur lacus. Etiam quis porttitor est, vitae ullamcorper sem. 
                        </p>
                    </li>
                    <li>
                        Random User 3:
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur elit ante, molestie commodo dui varius non. Phasellus quis augue a mauris fermentum tincidunt at vel arcu. Integer at magna vitae arcu tempus pretium. Phasellus viverra luctus varius. Aliquam vulputate mi sit amet tellus tincidunt porttitor in at urna. Praesent sed ante semper, ullamcorper enim ac, efficitur lacus. Etiam quis porttitor est, vitae ullamcorper sem. 
                        </p>
                    </li>
                    <li>
                        Random User 4:
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur elit ante, molestie commodo dui varius non. Phasellus quis augue a mauris fermentum tincidunt at vel arcu. Integer at magna vitae arcu tempus pretium. Phasellus viverra luctus varius. Aliquam vulputate mi sit amet tellus tincidunt porttitor in at urna. Praesent sed ante semper, ullamcorper enim ac, efficitur lacus. Etiam quis porttitor est, vitae ullamcorper sem. 
                        </p>
                    </li>
                    <li>
                        Random User 5:
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur elit ante, molestie commodo dui varius non. Phasellus quis augue a mauris fermentum tincidunt at vel arcu. Integer at magna vitae arcu tempus pretium. Phasellus viverra luctus varius. Aliquam vulputate mi sit amet tellus tincidunt porttitor in at urna. Praesent sed ante semper, ullamcorper enim ac, efficitur lacus. Etiam quis porttitor est, vitae ullamcorper sem. 
                        </p>
                    </li>
                </ol>
            </div> 
        </div>
    )
}

export default Product;