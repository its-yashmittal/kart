const {MongoClient, ObjectId} = require('mongodb');

const MONGO_URL ="MONGO_URI";
const db_name = "kart";
const bcrypt = require('bcryptjs');

async function addProduct(pname, pprice, pbrand, pColor, pCategory, pDescription, pQuantity, pAudience){
    const client = await MongoClient.connect(MONGO_URL);
    const kartdb = client.db(db_name);
    const products = kartdb.collection('products');
    const product = {
        name: pname,
        price: pprice,
        brand: pbrand,
        color: pColor,
        category: pCategory,
        description: pDescription,
        quantity: pQuantity,
        audience: pAudience,
    };
    const result = await products.insertOne(product);
    console.log('inserted');
    return result;
}

async function readProducts(){
    const client = await MongoClient.connect(MONGO_URL);
    const kartdb = client.db(db_name);
    const products = kartdb.collection('products');
    const result = await products.find().toArray();
    console.log(result);
    console.log('result returned');
    return result;
}

async function addUsers(fname, lname, mobNum, email, password, type){
    const client = await MongoClient.connect(MONGO_URL);
    const kartdb = client.db(db_name);
    const users = await kartdb.collection("users");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        firstName: fname,
        lastName: lname,
        mobile: mobNum,
        username: email,
        password: hashedPassword,
        accountType: type, 
        cart: [],
        
    }
    const result = await users.insertOne(user);
    console.log('Inserted');
    console.log(result)
    return result;
}

async function findUsersByUsername(id){
    const client = await MongoClient.connect(MONGO_URL);
    const kartdb = client.db(db_name);
    const users = kartdb.collection("users");
    const result = await users.find({username: id}).toArray().catch((err)=>{return err});
    console.log(result);
    return result;
}

async function findUsersById(param){
    const client = await MongoClient.connect(MONGO_URL);
    const kartdb = client.db(db_name);
    const users = kartdb.collection("users");
    const result = await users.find({_id: ObjectId(param)}).toArray().catch((err)=>{return err});
    console.log(result);
    return result;
}

async function findProductsById(param){
    const client = await MongoClient.connect(MONGO_URL);
    const kartdb = client.db(db_name);
    const products = kartdb.collection('products');
    const result = await products.find({_id: ObjectId(param)}).toArray().catch((err)=>{return err});
    return result;
}

async function findProductsByCategory(param){
    const client = await MongoClient.connect(MONGO_URL);
    const kartdb = client.db(db_name);
    const products = kartdb.collection('products');
    const result = await products.find({category: param}).toArray().catch((err)=>{return err});
    return result;
}

async function findBrandsByCategory(param){
    const client = await MongoClient.connect(MONGO_URL);
    const kartdb = client.db(db_name);
    const products = kartdb.collection('products');
    const result = await products.distinct('brand', {category: param})
    return result;
}

async function updateKart(userId, kart){
    const client = await MongoClient.connect(MONGO_URL);
    const kartdb = client.db(db_name);
    const users = kartdb.collection('users');
    await users.update({_id: ObjectId(userId)},{$set: {cart: kart}});
}

async function updateUser(userId, value){
    const client = await MongoClient.connect(MONGO_URL);
    const kartdb = client.db(db_name);
    const users = kartdb.collection('users');
    await users.update({_id: ObjectId(userId)}, {$set: {accountType: value}});
}

exports  = module.exports = {
    addProduct, readProducts, addUsers, findUsersByUsername, findUsersById, findProductsById, 
    findProductsByCategory, findBrandsByCategory, updateKart, updateUser,
};
