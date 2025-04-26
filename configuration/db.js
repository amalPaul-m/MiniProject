
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'movietrailler';

let db;

async function connectToDB() {
  if (db) return db; // If already connected, return it

  const client = await MongoClient.connect(url);
  console.log('MongoDB Connected');
  db = client.db(dbName);
  return db;
}

module.exports = connectToDB;






// const MongoClient= require('mongodb').MongoClient

// const state = { db:null}

// module.exports.connect=function(done){

// const url = 'mongodb://localhost:27017';
//   const client = new MongoClient(url);
//   const dbName = 'movietrailler';

//   MongoClient.connect(url,(err,data)=>{

//     if(err) return done(err)
//     state.db=data.db(dbName)
//     done()
//   })
// }

//   module.exports.get=function(){
//     return state.db
  
// }





// const MongoClient= require('mongodb').MongoClient

//  const url = 'mongodb://localhost:27017';
//   const client = new MongoClient(url);
//   const dbName = 'movietrailler';
  
//   async function connectDB(done) {
//       try {
//           // Connect to MongoDB server
//           await client.connect();
//           console.log('Connected successfully to MongoDB');
  
//           // Select the database
//           const db = client.db(dbName);
  
//         //   // You can now perform database operations here
//         //   const collection = db.collection('users');
  
//         //   const data = await collection.insertOne(req.body)
//         //   console.log('Data:', data);
          
//       } catch (err) {
//           console.error('Connection error:', err);
//       } finally {
//           // Close the connection
//           await client.close();
//       }
//   }
  
//   connectDB();


//   module.exports = connection;


