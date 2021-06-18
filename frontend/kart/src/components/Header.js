import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, useHistory } from "react-router-dom"
import logo from '../images/kart.svg'
import 'bulma/css/bulma.min.css'
import '../css/Header.css'
import Axios from "axios"
function Header(){
    const [shirts, setShirts] = useState([]);
    const [watches, setWatches] = useState([]);
    const [mobiles, setMobiles] = useState([]);
    const [tshirts, setTShirts] = useState([]);
    const [trousers, setTrousers] = useState([]);
    const [trackpants, setTrackpants] = useState([]);
    let history = useHistory();
    useEffect(()=>{
        Axios({
            method: 'GET',
            url: 'http://localhost:2424/user',
            withCredentials: true,
        }).then((res)=>{
            if(res.data.status === false){
                document.getElementById('loginBtn').style.visibility = 'visible';
                document.getElementById('logoutBtn').style.visibility = 'collapse';
            } else{
                document.getElementById('loginBtn').style.visibility = 'collapse';
                document.getElementById('logoutBtn').style.visibility = 'visible';
            }
        })
        let cat = ['Shirts', 'T-Shirts', 'Trousers', 'Trackpants', 'Mobiles', 'Watches']
        for(let item = 0;item<cat.length;item++){
            console.log('logging item in forloop' + cat[item]);
            Axios({
                method: 'GET',
                url: 'http://localhost:2424/brands',
                params: {category: cat[item]}
            }).then((res)=>{
                if(cat[item] === 'Watches') setWatches(res.data);
                else if(cat[item] === 'Shirts') setShirts(res.data);
                else if(cat[item] === 'T-Shirts') setTShirts(res.data);
                else if(cat[item] === 'Trousers') setTrousers(res.data);
                else if(cat[item] === 'Trackpants') setTrackpants(res.data);
                else if(cat[item] === 'Mobiles') setMobiles(res.data);
            })
            .catch((err)=>console.log(err));
        }   
    }, [])
    return(
        <Router>
        <header className="topBar columns navbar">
            <div className="logoDiv navbar-brand column">
                <img src={logo} className="logoImg image is-rounded" alt="logo"/>
            </div>
            <div className= 'userActions navbar-end column btns'>
                    <button id="loginBtn" className="button is-medium" onClick={()=>{
                        history.push('/login', {from:'/'});
                        

                        } } >
                        Login
                    </button>
                    <button id="logoutBtn" className="button is-medium" onClick={()=>{
                        Axios({
                            method: 'GET',
                            url: 'http://localhost:2424/logout',
                            withCredentials: true
                        }).then((res)=>{
                            alert('Successfully Logged Out!');
                            history.push('/', {from:'/'});
                            document.getElementById('logoutBtn').style.visibility = 'collapse';
                            document.getElementById('loginBtn').style.visibility = 'visible';
                        }).catch((err)=>{throw err})
                        
                    }} style={{visibility : 'collapse'}}>
                        Logout
                    </button>
                    <button className="button is-medium" onClick={()=>history.push('/signup', {from :'/'})}>
                        Sign-Up
                    </button>
                    <button className="button is-medium" onClick={()=>history.push('/')} >
                        Home
                    </button>
                    <button className="button is-medium" onClick={()=>{
                        Axios({
                            method: 'GET',
                            url: 'http://localhost:2424/user',
                            withCredentials : true,
                        }).then((res)=>{
                            if(res.data.status=== false){
                                history.push('/login', {from : '/addproducts'});
                                document.getElementById('errorMsg').innerHTML = 'You need to login before you can start adding products!'
                            } else{
                                history.push('/addproducts');
                            }
                        })
                        }} >
                        Add Products
                    </button>
                    <button className="button is-medium" id="kartBtn" onClick={()=>{
                        Axios({
                            method: 'GET',
                            url: 'http://localhost:2424/user',
                            withCredentials: true,
                        }).then((res)=>{
                            console.log(res.data);
                            if(res.data.status === false){
                                history.push('/login', {from : '/kart'});
                            } else{
                                history.push('/kart');
                            }
                        }).catch((err)=>console.log(err));
                        }}>
                        🛒Kart
                    </button>
                    <button className="button is-medium" id="kartBtn" onClick={()=>{
                        Axios({
                            method: 'GET',
                            url: 'http://localhost:2424/user',
                            withCredentials: true,
                        }).then((res)=>{
                            console.log(res.data);
                            if(res.data.status === false){
                                history.push('/login', {from : '/kart'});
                            } else{
                                history.push('/user');
                            }
                        }).catch((err)=>console.log(err));
                        }}>
                        User
                    </button>
            </div> 
        </header>
        <div className='menubar'>
        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger prodCat">
                <button className="button is-medium category" aria-haspopup="true" aria-controls="dropdown-menu"
                onClick={(event)=>{history.push('/watches')}}
                >
                    Watches
                </button>
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    Brands:
                <div className="dropdown-item">
                    {watches.map((prod, key)=>{
                        return(
                            <div id={key}>{prod}</div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger prodCat">
                <button className="button is-medium category" aria-haspopup="true" aria-controls="dropdown-menu"
                onClick={(event)=>{history.push('/tshirts')}}
                >
                    T-Shirts
                </button>
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    Brands:
                    <div className="dropdown-item">
                    {tshirts.map((prod, key)=>{
                        return(
                            <div id={key}>{prod}</div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger prodCat">
                <button className="button is-medium category" aria-haspopup="true" aria-controls="dropdown-menu"
                onClick={(event)=>{history.push('/shirts')}}
                >
                    Shirts
                </button>
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    Brands:
                    <div className="dropdown-item">
                    {shirts.map((prod, key)=>{
                        return(
                            <div id={key}>{prod}</div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger prodCat">
                <button className="button is-medium category" aria-haspopup="true" aria-controls="dropdown-menu"
                onClick={(event)=>{history.push('/trousers')}}
                >
                    Trousers
                </button>
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    Brands:
                    <div className="dropdown-item">
                    {trousers.map((prod, key)=>{
                        return(
                            <div id={key}>{prod}</div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger prodCat">
                <button className="button is-medium category" aria-haspopup="true" aria-controls="dropdown-menu"
                onClick={(event)=>{history.push('/trackpants')}}
                >
                    Trackpants
                </button>
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    Brands:
                    <div className="dropdown-item">
                    {trackpants.map((prod, key)=>{
                        return(
                            <div id={key}>{prod}</div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger prodCat">
                <button className="button is-medium category" aria-haspopup="true" aria-controls="dropdown-menu"
                onClick={(event)=>{history.push('/mobiles')}}
                >
                    Mobiles
                </button>
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    Brands:
                    <div className="dropdown-item">
                    {mobiles.map((prod, key)=>{
                        return(
                            <div id={key}>{prod}</div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
        <div>
            <button className="button is-medium category" aria-haspopup="true" aria-controls="dropdown-menu"
                onClick={(event)=>{history.push('/vip')}}
                >
                    VIP Lounge
            </button>
        </div>
        </div>
        <div className="greeting">
        <h1> Welcome To KART: Your One Stop Shop </h1>
        </div>
        </Router>
    )
}


export default Header; 