//help for this section from MongoDB github quick start documentation at https://mongodb.github.io/node-mongodb-native/3.5/quick-start/quick-start/
//NOTES ABOUT DATABASE:
//name: MongoDB
//version: 4.0.4
//port number: 27017
//download link for your chosen database: https://hub.docker.com/_/mongo


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydb';

// Create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true})

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  // console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertCustomerDocuments(db, function() {
    findCustomerDocuments(db, function() {
      insertOrderDocuments(db, function() {
        findOrderDocuments(db, function() {
          client.close();
        });
      });
    });
  });
});

const insertCustomerDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('customers');
    // Insert some documents
    collection.insertMany([
      {id: 1, c_name : 'Spoon', tot_goods : 4},
      {id: 2, c_name : 'Justine', tot_goods : 5},
      {id: 3, c_name : 'Scooter', tot_goods : 6}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3,result.insertedCount);
      assert.equal(3,Object.keys(result.insertedIds).length);
      callback(result);
      return result;
    });
  }

  const insertOrderDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('orders');
    // Insert some documents
    collection.insertMany([
      {id : 1, tot_goods : 4},
      {id : 2, tot_goods : 5},
      {id : 3, tot_goods : 6}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3,result.insertedCount);
      assert.equal(3,Object.keys(result.insertedIds).length);
      callback(result);
      return result;
    });
  }

  const findCustomerDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('customers');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      // console.log("Found the following records");
      // console.log(docs)
      callback(docs);
      return docs;
    });
  }

  const findOrderDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('orders');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      // console.log("Found the following records");
      // console.log(docs)
      callback(docs);
      return docs;
    });
  }

  module.exports = insertCustomerDocuments, insertOrderDocuments, findCustomerDocuments, findOrderDocuments;