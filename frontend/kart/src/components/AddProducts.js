import Axios from "axios";
import React from "react"
import '../css/AddProducts.css'
class AddProduct extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            price: '',
            brand: '',
            color: '',
            description: '',
            qty: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.nameChange = this.nameChange.bind(this)
        this.priceChange = this.priceChange.bind(this)
        this.brandChange = this.brandChange.bind(this)
        this.colorChange = this.colorChange.bind(this)
        this.categoryChange = this.categoryChange.bind(this)
        this.descriptionChange = this.descriptionChange.bind(this)
        this.qtyChange = this.qtyChange.bind(this);
    }
    handleSubmit(event){
        var errorMsg = document.getElementById("errorMsg");
        var pCategory = document.getElementById("category").value;
        var audience = document.getElementById('audience').value;
        Axios({
            method: "POST",
            data: {
                name: this.state.name,
                price: this.state.price,
                brand: this.state.brand,
                color: this.state.color,
                category: pCategory,
                description: this.state.description,
                quantity: this.state.qty,
                audience : audience,
            },
            url: "http://localhost:2424/products",
            withCredentials: true
        }).then((res)=>{
            console.log(res.data);
            if(res.data.status===false){
                errorMsg.innerText = res.data.message;
            } else{
                alert("Product added successfully!")
            }
        })
        event.preventDefault();
    }
    nameChange(event){
        this.setState({name: event.target.value });
    }
    priceChange(event){
        this.setState({price: event.target.value });
    }
    brandChange(event){
        this.setState({brand: event.target.value });
    }
    colorChange(event){
        this.setState({color: event.target.value });
    }
    categoryChange(event){
        this.setState({category: event.target.category});
    }
    descriptionChange(event){
        this.setState({description: event.target.value});
    }
    qtyChange(event){
        this.setState({qty: event.target.value});
    }
    render(){
        return(
            <div style={{textAlign:"center"}}>
                <h1>Enter the product details</h1>
                <div id="errorMsg">

                </div>
                <div className="prodForm">
                
                <form onSubmit={this.handleSubmit}>
                    <label>Product Name: </label><br />
                    <input className="input is-large" required type = "text" onChange = {this.nameChange}/>
                    <br /><label>Price:</label><br />
                    <input className="input is-medium" required type = "number" onChange = {this.priceChange} />
                    <br /><label>Brand:</label><br />
                    <input className="input is-medium" required type = "text" onChange = {this.brandChange} /> 
                    <br/><label>Color: </label><br />
                    <input className="input is-medium" required type = "text" onChange = {this.colorChange}/>
                    <br/><label>Category: </label><br />
                    <select id="category" className="categoryDropDown" onChange={this.categoryChange}>
                        <option>Shirts</option>
                        <option>Watches</option>
                        <option>Mobiles</option>
                        <option>T-Shirts</option>
                        <option>Trousers</option>
                        <option>Trackpants</option>
                    </select>
                    <br /><label>Quantity in Stock:</label><br />
                    <input className="input is-medium" required type = "number" onChange = {this.qtyChange}/>
                    <br /><label>Select Audience</label><br />
                    <select required id="audience">
                        <option>Regular</option>
                        <option>VIP</option>
                    </select>
                    <br/><label>Description: </label><br />
                    <textarea required className="descriptionBox" onChange={this.descriptionChange} /><br />
                    <button className="button loginBtn is-medium">Add</button>
                </form> 
                </div>
            </div>
        )
    }
}


export default AddProduct