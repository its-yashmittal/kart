import React from "react";
import Axios from "axios"
import { useEffect, useState } from "react"
import '../css/User.css'
function User(){
    const [userDetails, setUserDetails] = useState({}); 
    const [updatedInfo, setUpdatedInfo] = useState('');
    useEffect(()=>{
        Axios({
            method: 'GET',
            url: 'http://localhost:2424/user',
            withCredentials: true,
        }).then((res)=>{
            console.log(res.data);
            setUserDetails(res.data);
        }).catch((err)=>console.log(err));
    }, []);
    return(
        <div className="userInfoContainer">
        <div className="userInfo">
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Mobile Num: {userDetails.mobile}</p>
            <p>Email/Username: {userDetails.username}</p>
            <form onSubmit={
                Axios({
                    method: 'POST',
                    data:{
                        accountType: updatedInfo,
                    },
                    url: 'http://localhost:2424/update',
                    withCredentials: true,
                })
            }>
            <p>Current Type: {userDetails.accountType}</p>
            <input className="input is-small accType" id="username" type="text" onSubmit={(event)=>setUpdatedInfo(event.target.value)}></input><br />
            <button className="button is-small" type="submit">Update</button>
            </form>  
        </div>
        </div>
    )
}

export default User