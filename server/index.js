const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./src/models/product.model.js');

const app = express();
app.use(express.json());

// Root Get Request
app.get('/', (req, res) => {
  console.log('SERVER: Root Request!');

  if (password == '') {
    res.json({active: false});
    return;
  }
  res.json({active: true});
});

// Post Product Request
app.post('/api/product', async (req, res) => {
  try {
    console.log('SERVER: Post Request!');

    const product = await Product.create(req.body);
    res.status(200).send(product);

  } catch (error) {
    res.status(500).send({message: error.message});
  }
});

// Get Products Request
app.get('/api/products', async (req, res) => {
  try {
    console.log('SERVER: Get Request!');

    const products = await Product.find({});
    res.status(200).send(products);

  } catch (error) {
    res.status(500).send({message: error.message});
  }
});

// Get Product(id) Request
app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`SERVER: Get Request for id: ${id}`);

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send({message: 'Product not found!'});
      return;
    }
    res.status(200).send(product);

  } catch (error) {
    res.status(500).send({message: error.message});
  }
});

// Put Product(id) Request
app.put('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`SERVER: Put Request for id: ${id}`);

    const product = await Product.findByIdAndUpdate(id,req.body,);

    if (!product) {
      res.status(404).json({message: 'Product not found!'});
      return;
    };

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send({message: error.message});
  }
})

// Start Server
app.listen(3000, () => {
  if (password == '') {
    console.error('SERVER: Issert MongoDB password!');
    return;
  }
  console.log('SERVER: Server is running on port 3000!')
});

let password = process.env.MONGODB_PASSWORD;
let uri = `mongodb+srv://romulohenri000:${password}@backenddb.fwhrjwq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`;

if (password) {
  mongoose.connect(uri)
  .then(() => {
    console.log('SERVER: Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('SERVER: Could not connect to MongoDB!', err.message);
  });
};