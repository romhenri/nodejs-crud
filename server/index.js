const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./src/routes/product.route.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api/products', productRoutes);

// Root Get Request
app.get('/', (req, res) => {
  console.log('SERVER: Root Request!');

  if (password == '') {
    res.json({active: false});
    return;
  }
  res.json({active: true});
});

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