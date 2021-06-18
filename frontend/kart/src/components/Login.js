import 'bulma/css/bulma.min.css'
import '../css/Login.css'
import { NavLink, useHistory } from "react-router-dom"
import React from 'react'
import {useState} from 'react'
import Axios from "axios"


function Login(){
    var history = useHistory();
    const [userName, setUsername] = useState('');
    const [passWord, setpassword] = useState('');
    return(
        <div>
            <h2 id="errorMsg" style={{textAlign: "center", fontSize: "50pt", fontColor: "red"}}> </h2>
            <form className="loginForm" onSubmit={(event)=>{
                Axios({
                    method: "POST",
                    data: {
                      username: userName,
                      password: passWord,
                    },
                    withCredentials: true,
                    url: "http://localhost:2424/login",
                    }).then((res) => {
                        console.log(res.data);
                        if(res.data.status!== false){
                            console.log("redirecting")
                            document.getElementById('loginBtn').style.visibility = 'collapse';
                            document.getElementById('logoutBtn').style.visibility = 'visible';
                            document.getElementById('errorMsg').innerText = '';
                            history.push(history.location.state.from);
                        } else{
                            document.getElementById('errorMsg').innerText = res.data.message;
                        }
                    }).catch((err)=>{throw err});
                
                event.preventDefault();
            }}>
                <lable className="label">Username: </lable>
                <input className="input is-medium" type="text" onChange={(event)=>{setUsername(event.target.value)}} />
                <label className="label">Password</label>
                <input className="input is-medium" type="password" onChange={(event)=>{setpassword(event.target.value)}}/>
                <button className="button loginBtn is-medium"> LogIn </button>
                Forgot Password?<br />
                Don't have an account? <NavLink to="/signup" target="_blank"> Sign-up! </NavLink>
            </form> 
            </div>
        )
}
    

export default Login;