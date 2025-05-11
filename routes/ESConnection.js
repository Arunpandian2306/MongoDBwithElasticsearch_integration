const { Client } = require('@elastic/elasticsearch');

// Create a new Elasticsearch client instance
const client = new Client({
  node: 'http://localhost:9200', // Replace with your Elasticsearch node URL
  maxRetries: 5,
  requestTimeout: 60000,
});

async function connectToES() {
  try {
    // Ping the cluster to verify connection
    const isAlive = await client.ping();
    console.log('Connected to Elasticsearch');
    return client;
  } catch (error) {
    console.error('Elasticsearch connection error:', error);
    throw error;
  }
}

module.exports = connectToES;
