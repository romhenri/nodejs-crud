const express = require('express');
const mongoose = require('mongoose');

const Product = require('./src/models/product.model.js');

const app = express();
app.use(express.json());

// Root Get Request
app.get('/', (req, res) => {
  console.log('SERVER: Root Request!');
  res.send('hello world!');
});

// Post Request
app.post('/api/products', async (req, res) => {
  try {
    console.log('SERVER: Post Request!');

    const product = await Product.create(req.body);
    res.status(200).send(product);

  } catch (error) {
    res.status(500).send({message: error.message});
  }
});

// Start Server
app.listen(3000, () => {
  console.log('SERVER: Server is running on port 3000!')
});

let password = 'W64Q84gxwdQdVGAX';
let uri = `mongodb+srv://romulohenri000:${password}@backenddb.fwhrjwq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`;

mongoose.connect(uri)
  .then(() => {
    console.log('SERVER: Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('SERVER: Could not connect to MongoDB!', err);
  });