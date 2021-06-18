const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const addProduct = require('./db.js').addProduct;
const readProducts = require('./db.js').readProducts;
const addUsers  =require('./db.js').addUsers;
const findUsersByUsername  =require('./db.js').findUsersByUsername;
const findUsersById  =require('./db.js').findUsersById;
const findProductsById  =require('./db.js').findProductsById;
const findProductsByCategory  =require('./db.js').findProductsByCategory;
const findBrandsByCategory  =require('./db.js').findBrandsByCategory;
const updateKart = require('./db.js').updateKart;
const updateUser = require('./db.js').updateUser;
const cors = require('cors')
var kart = []

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials : true,
}));

app.use(
    session({
      secret: "thisistopsecretshh",
      resave: true,
      saveUninitialized: true,
    })
  );


app.get('/', (req, res)=>{
    res.send("Hello, There!");
})

app.get('/products', async (req, res)=>{
    readProducts().then((product)=>{
        console.log(typeof(product));
        res.send(product)
    })
    .catch((err)=>{
        res.status(500).send("could not retrieve")
    })
})


app.post('/products', async (req, res)=>{
    console.log("req.session recevied in addProducts is: ");
    console.log(req.session);
    if(!req.session.userId){
        return res.send({message: "You need to be signed in with a seller account to add products!", status: false});
    }
    console.log(req.body);
    let user = await findUsersById(req.session.userId);
    console.log('logging user');
    console.log(user[0].accountType);
    if(user[0].accountType === 'Seller'){
    let name = req.body.name;
    let price = req.body.price;
    let brand = req.body.brand;
    let color = req.body.color;
    let category = req.body.category;
    let description = req.body.description;
    let quantity = req.body.quantity;
    let audience = req.body.audience;
    if(name&&price&&brand&&color&&category&&description&&quantity&&audience){  
        addProduct(name, price, brand, color, category, description, quantity, audience)
        .then((product)=>{
            console.log('adding product')
            res.status(200).send(product)
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).send('error');
        });
    } else {
        if(!name){
            res.send({message: "name should be a string and is required!", status: false});
            return;
        } else if(!price){
            res.send({message: "price should be a number and is required", status: false});
        } else if(!brand){
            res.send({message: "brand name should be a string and is required", status: false});
        } else if(!color){
            res.send({message: "color should be a string and is required", status: false})
        } else if(!description){
            res.send({message: "description is required", status: false});
        } else if(!category){
            res.send({message: "selecting a category is required", status: false});   
        }
    }} else {
        res.send({message: "You need to be signed in with a seller account to add products!", status: false});
    }
    
})

app.post('/signup', (req, res)=>{
    var users;
    console.log(req.body.fname);
    findUsersByUsername(req.body.email).then((res)=>{
        users = res;
    }).catch(err => console.log(err));
    if(users) res.send({message: 'email already registered', status: false});
    else {
        addUsers(req.body.fname, req.body.lname, req.body.mobNum, req.body.email, req.body.password, req.body.accountType)
        .then((user)=>{
            console.log("added")
            res.status(201).send("User Created");
        })
        .catch((err)=>{
            console.error(err);
            console.log("error")
            res.status(500).send(err);
        })
    }
})

app.post('/login', async (req, res)=>{ 
    console.log(req.body);
    const user = await findUsersByUsername(req.body.username);
    console.log(user);
    if(user.length === 0){
        return res.status(404).send({message: "user not found", status: false});
    }
    const result = await bcrypt.compare(req.body.password, user[0].password)
    if(result === false){
        return res.status(401).send({message: "incorrect password", status: false});
    }
    req.session.userId = user[0]._id;
    console.log(req.session)
    res.status(201).send(user);
});

app.get('/user', async (req, res)=>{
    console.log(req.session);
    if(!req.session.userId){
        res.send({message: "not logged in!", status: false});
    }
    else{
        const user = await findUsersById(req.session.userId);
        console.log(user[0]);
        res.send(user[0]);
    }
})

app.get('/buy', (req, res)=>{
    res.send(kart[0]);
})

app.post('/buy', async (req, res)=>{
    var id = req.body.id;
    console.log(id);
    const prod = await findProductsById(id);
    console.log(prod);
    kart = prod;
    if(!req.session.userId){
        res.send({message: "you need to be logged in to view this page!", status: false});
        return;
    }
    res.send('done!')
})

app.get('/brands', async (req, res)=>{
    console.log(req.query.category)
    const list = await findBrandsByCategory(req.query.category).then((brand)=>{
        console.log(brand);
        res.send(brand);
    }).catch((err)=>res.send(err));
    
})

app.get('/category', async (req, res)=>{
    console.log(req.query.category);
    const products = await findProductsByCategory(req.query.category).then((product)=>{
        console.log(product);
        res.send(product);
    }).catch((err)=>{res.send(err)});
})
app.get('/logout', (req, res)=>{
    req.session.userId = null;
    res.send('done');
})

app.post('/kart', async (req, res)=>{
    if(!req.session.userId){
        res.send({message: "you need to be logged in to view this page!", status: false});
        return;
    }
    var id = req.body.id;
    console.log(id);
    const prod = await findProductsById(id);
    const user = await findUsersById(req.session.userId);
    kart = user[0].cart;
    kart.push(prod);
    await updateKart(req.session.userId, kart);
    res.send('done!');
})

app.get('/kart', async (req, res)=>{
    if(!req.session.userId){
        return res.send([{message: 'you need to sign in', status: false}]);
    } else{
        const user = await findUsersById(req.session.userId);
        console.log("logging user's kart");
        console.log(user[0].cart)
        res.send(user[0].cart);
    }
})

app.get('/checkout', async (req, res)=>{
    kart = [];
    await updateKart(req.session.userId, kart);
    res.send('Kart Emptied successfully');
})

app.post('/update', async (req, res)=>{
    console.log(req.body);
    await updateUser(req.session.userId, req.body.accountType);
    res.send('done');
})

app.listen(2424, ()=>{
    console.log("Server started at http://localhost:2424");
})



