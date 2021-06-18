import React from "react"
import '../css/SignUp.css'
import { NavLink } from "react-router-dom"
class SingUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            fname: '',
            lname: '',
            mobNum: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: '',
        };

        this.fnameChange = this.fnameChange.bind(this)
        this.lnameChange = this.lnameChange.bind(this)
        this.mobNumChange = this.mobNumChange.bind(this)
        this.emailChange = this.emailChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
        this.confirmPasswordChange = this.confirmPasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    fnameChange(event){
        this.setState({fname: event.target.value})
        console.log(this.state);
    }
    lnameChange(event){
        this.setState({lname: event.target.value})
        console.log(this.state);
    }
    mobNumChange(event){
        this.setState({mobNum: event.target.value})
        console.log(this.state);
    }
    emailChange(event){
        this.setState({email: event.target.value})
        console.log(this.state);
    }
    passwordChange(event){
        this.setState({password: event.target.value})
        console.log(this.state);
    }
    confirmPasswordChange(event){
        this.setState({confirmPassword: event.target.value})
        console.log(this.state);
    }
    handleSubmit(event){
        var pass = document.getElementById('password');
        var confirmPass = document.getElementById('confirmPassword');
        var accType = document.getElementById('accType').value;
        console.log('logging account type!')
        console.log(accType);
        this.setState({accountType: accType})
        console.log(pass.value)
        console.log(confirmPass.value)
        if(pass.value!==confirmPass.value){
            document.getElementById("unsuccessfulReg").style.visibility = "visible";
            document.getElementById('confirmPassword').style.borderColor = "red";
            document.getElementById('confirmPassword').style.border = "solid red 1pt";
        }
        else{
            
            const credentials = {
                fname: this.state.fname, 
                lname: this.state.lname, 
                email: this.state.email, 
                mobNum: this.state.mobNum,
                password: this.state.password, 
                confirmPassword: this.state.confirmPassword,
                accountType: accType,
            };
            const requestOptions ={
                method: "POST",
                headers: { 'Content-Type': 'application/json' }, //this line is imp
                body: JSON.stringify(credentials)
            };
            fetch("http://localhost:2424/signup", requestOptions)
            .then(res=>res.json())
            .then((result)=>{
                if(result.status === false){
                    document.getElementById('emailTaken').innerText = result.message;
                } else {
                    document.getElementById("successfulReg").style.visibility = "visible";
                    console.log("inserted");
                    console.log(result);
                }
            })
            .catch((error)=>{
                console.error(error);
            })
            
            this.setState({fname: ''});
            this.setState({lname: ''});
            this.setState({mobNum: ''});
            this.setState({email: ''});
            this.setState({password: ''});
            this.setState({confirmPassword: ''});
            alert("User Created Successfully!");
            
        }
        
        event.preventDefault();
    }
    render(){
        return(
            <div>
                <div id="greeting" className="greeting">
                    <h1>Fill The SignUp Form Below To Create an Account</h1>
                    <h3>Sign-Up Form</h3>
                </div>
                <div id="successfulReg" className="successfulReg"style={{visibility: "hidden", borderColor: "chartreuse"}} >
                    <h3 className="success">User Added Successfully!</h3>
                </div>
                <div id="unsuccessfulReg" className="unsuccessfulReg" style={{visibility: "hidden", borderColor: "red"}}>
                     <h3 id = 'emailTaken' className="passMismatch"> </h3>
                </div>
                <form className="signUpForm" onSubmit={this.handleSubmit}>
                    <label className="label">First Name</label>
                    <input required id="fname" className="input is-medium" type="text" value={this.state.fname} onChange={this.fnameChange} />
                    <label className="label">Last Name</label>
                    <input required id="lname" className="input is-medium" type="text" value={this.state.lname} onChange={this.lnameChange} />
                    <label className="label">Mobile Number</label>
                    <input required id="mobNum" className="input is-medium" type="Number" value={this.state.mobNum} onChange={this.mobNumChange}/>
                    <label className="label">E-Mail</label>
                    <input required id="email" className="input is-medium" type="email" value={this.state.email} onChange={this.emailChange}/>
                    <label className="label">Password</label>
                    <input required id="password" className="input is-medium" type="password" value={this.state.password} onChange={this.passwordChange}/>
                    <label className="label">Confirm Password</label>
                    <input required id="confirmPassword" className="input is-medium" type="password" value={this.state.confirmPassword} onChange={this.confirmPasswordChange}/>
                    <label>Account Type:</label>
                    <select className="input is-medium" id="accType">
                        <option>Seller</option>
                        <option>VIP</option>
                        <option>Regular</option>
                    </select>
                    <button className="button is-medium signUpBtn" type="submit">
                        Sign-Up
                    </button>
                    Already have an account?<NavLink to="/login" target="_blank"> Log-In! </NavLink>
                </form>
            </div>
        )
    }
    
}

export default SingUp