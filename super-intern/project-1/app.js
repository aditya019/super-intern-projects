//Requiring libraries
const express = require('express');
const mongoose = require("mongoose");
const ejs = require("ejs");
const methodOverride = require('method-override');

//importing schema and connecting to mongoDB
const Product = require("./models/product");
mongoose.connect("mongodb://localhost:27017/super-intern-1");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Data Base Connected to App JS super-intern-1 !!!');
});

const app = express();
app.set("view engine", 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('homepage');
})

app.get('/boards', (req, res) => {
    res.render('newBoard');
})

app.post('/newBoard', async (req, res) => {
    try {
        const count = await Product.count();
        const title = req.body.title;
        const newProduct = new Product({title: title, stage: 1, id: count+1});
        await newProduct.save();
        console.log("new product in DB");
        res.redirect('/');
    } catch(err) {
        console.log(err);
        res.render('error', {err});
    }
})

app.get('/allProducts', async (req, res) => {
    const allProducts = await Product.find();
    res.render('allProducts', {allProducts});
})

app.get('/product/:id', async (req, res) => {
    try {
        const reqId = req.params.id;
        const prod = await Product.find({id: reqId});
        res.render('productInfo', {prod});
    } catch(err) {
        res.render('error', {err});
    }
})

app.get('/update/:id', async (req, res) => {
    try {
        const reqId = req.params.id;
        const prod = await Product.findOne({id: reqId});
        res.render('updateBoard', {prod});
    } catch(err) {
        res.render('err', {err});
    }
})

app.put('/boards/:id', async (req, res) => {
    try {
        const reqId = req.params.id;
        const stage = req.body.stage;
        if(stage > 3 || stage < 1) {
            res.render('error', {err: "Stage should be between 1 and 3"});
        } else {
            await Product.findOneAndUpdate({id: reqId}, {stage: stage});
            console.log("product updated !!!");
            res.redirect('/product/' + reqId);
        }
    } catch(err) {
        res.render('error', {err});
    }
})

app.get('*', (req, res) => {
    res.render('error', {err: "404 not found"});
})

app.listen(3000, () => {
    console.log("listening on port: 3000");
})