const insertCustomerDocuments = function(db) {
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
    //   callback(result);
      return result;
    });
  }

  module.exports = insertCustomerDocuments;