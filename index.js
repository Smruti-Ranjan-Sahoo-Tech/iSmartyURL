// index.js
let express = require('express');
const connectToMongoDB = require('./connect');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
let routerURL = require('./App/Routes/url')
let staticRoute = require('./App/Routes/staticRoute')
const UrlModel = require('./App/Model/url.model');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up view engine for production
app.set('view engine', 'ejs');
app.set('views', './App/View');

// Serve static files (including favicon.ico) - REQUIRED for production
app.use(express.static('./App/View'));

// Routes
app.use("/url", routerURL); //http://localhost:5001/url
app.use("/", staticRoute); // Home route

connectToMongoDB()
// Ensure Mongo indexes match the schema
UrlModel.syncIndexes().catch((err) => console.error('Index sync error:', err));

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`🚀 URL Shortener running at http://localhost:${PORT}`);
});
