// dbconnect.js - MongoDB Connection Module
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function connectToDb() {
  try {
    if (!client.isConnected) {
      await client.connect();
    }
    console.log("Connected to MongoDB");
    return client.db('school'); // Database name
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
}

module.exports = connectToDb;
