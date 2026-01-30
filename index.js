// Import the Express library using require 
const express = require('express'); 
 
// Create an instance of an Express application 
const app = express();
const port = 4242;

// Needed for req.body later on
//app.use(express.json());

// Define a route for GET requests to the root URL ('/') 
app.get('/', (req, res) => { 
  // Use the send() method on the response object to send back a string 
  res.send('Hello from my Express server!'); 
});

// Define a route for GET requests to ('/about') 
app.get('/about', (req, res) => { 
  res.send('Hello from the About!'); 
});

// Mock database with products
const products = [
  {id: 1, name: 'Product 1', price: 129}, 
  {id: 2, name: 'Product 2', price: 229}, 
  {id: 3, name: 'Product 3', price: 299}, 
  {id: 4, name: 'Product 4', price: 149}, 
  {id: 5, name: 'Product 5', price: 99}, 
];

// Define a route for GET requests to ('/api/products') 
app.get('/api/products', (req, res) => { 
  //res.send('Hello from the Products!'); 
  res.json(products);
});

// Define a route for GET requests to ('/api/products/{id}') 
app.get('/api/products/:id', (req, res) => { 
  // Get the ID from the request parameters. Note: it will be a string. 
  const pid = parseInt(req.params.id); 
 
  // Find the product in our 'database' with the matching ID 
  const product = products.find((p) => p.id === pid); 
 
  // If no product was found, send a 404 status and an error message 
  if (!product) { 
    return res.status(404).json({ error: 'Product not found' }); 
  } 
 
  // If a product was found, send it as JSON 
  res.json(product); 
}); 

// Start the server and listen on the specified port 
app.listen(port, () => { 
  console.log(`Server is running and listening on http://localhost:${port}`); 
});
