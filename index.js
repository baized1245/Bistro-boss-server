// const express = require('express');
// const app = express();
// const cors = require('cors')
// const jwt = require('jsonwebtoken');
// require('dotenv').config()
// const port = process.env.PORT || 5000;

// // middleware
// app.use(cors());
// app.use(express.json());

// const verifyJWT = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if(!authorization){
//     return res.send(401).send({error: true, message: 'unauthorized access'});
//   }
//   // bearer token
//   const token = authorization.split(' ')[1]

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if(err){
//       return res.status(401).send({error: true, message: 'unauthorized access'})
//     }
//     req.decoded = decoded;
//     next();
//   })
// }


// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sadhin07.m9oc4kw.mongodb.net/?retryWrites=true&w=majority`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     // My collections
//     const usersCollection = client.db("bistroDb").collection("users");
//     const menuCollection = client.db("bistroDb").collection("menu");
//     const reviewCollection = client.db("bistroDb").collection("reviews");
//     const cartCollection = client.db("bistroDb").collection("carts");

//     // Jwt 
//     app.post('/jwt', (req, res) => {
//       const user = req.body;
//       const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '9' })

//       res.send({ token })
//     })
    
//     // users related apis
//     app.get('/users', async(req, res) => {
//       const result = await usersCollection.find().toArray();
//       res.send(result);
//     })

//     app.post('/users', async (req, res) => {
//       const user = req.body;
//       // console.log(user);
//       const query = { email: user.email }
//       const existingUser = await usersCollection.findOne(query);
//       // console.log('existing user', existingUser);
//       if(existingUser){
//         return res.send({ message: 'user already exist' })
//       }
//       const result = await usersCollection.insertOne(user);
//       res.send(result);
//     });

//     app.patch('/users/admin/:id', async(req,res) => {
//       const id = req.params.id;
//       console.log(id);
//       const filter = { _id: new ObjectId(id) };
//       const updateDoc = {
//         $set: {
//           role: 'admin'
//         },
//       };
//       const result = await usersCollection.updateOne( filter, updateDoc );
//       res.send(result);
//     });

//     // Can be empliment users delete function

//     // menu related apis
//     app.get('/menu', async(req, res) => {
//       const result = await menuCollection.find().toArray()
//       res.send(result);
//     });

//     // reviews related apis
//     app.get('/reviews', async(req, res) => {
//       const result = await reviewCollection.find().toArray()
//       res.send(result);
//     });

//     // Cart collection apis
//      app.get('/carts', verifyJWT, async(req, res) => {
//          const email = req.query.email;
//         //  console.log(email);
//          if(!email){
//           res.send([]);
//          }
//          const decodedEmail = req.decoded.email;
//          if(email !== decodedEmail){
//           return res.status(403).send({error: true, message: 'Forbidden access'})
//          }

//          const query = { email: email };
//          const result = await cartCollection.find(query).toArray();
//          res.send(result); 
//      });

//     app.post('/carts', async (req, res) => {
//       const item = req.body;
//       console.log(item);
//       const result = await cartCollection.insertOne(item);
//       res.send(result);
//     });

//     app.delete('/carts/:id', async(req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await cartCollection.deleteOne(query);
//       res.send(result);
//     });

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//     res.send('boss is sitting')
// })

// app.listen(port, () => {
//     console.log(`Bistro boss is sittion on port ${port}`);
// })

// // ..........






const express = require('express');
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sadhin07.m9oc4kw.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // My collections
    const usersCollection = client.db("bistroDb").collection("users");
    const menuCollection = client.db("bistroDb").collection("menu");
    const reviewCollection = client.db("bistroDb").collection("reviews");
    const cartCollection = client.db("bistroDb").collection("carts");

    // Jwt 
    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

      res.send({ token })
    })
    
    // users related apis
    app.get('/users', async(req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      // console.log(user);
      const query = { email: user.email }
      const existingUser = await usersCollection.findOne(query);
      // console.log('existing user', existingUser);
      if(existingUser){
        return res.send({ message: 'user already exist' })
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.patch('/users/admin/:id', async(req,res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: 'admin'
        },
      };
      const result = await usersCollection.updateOne( filter, updateDoc );
      res.send(result);
    });

    // Can be empliment users delete function

    // menu related apis
    app.get('/menu', async(req, res) => {
      const result = await menuCollection.find().toArray()
      res.send(result);
    });

    // reviews related apis
    app.get('/reviews', async(req, res) => {
      const result = await reviewCollection.find().toArray()
      res.send(result);
    });

    // Cart collection apis
     app.get('/carts', async(req, res) => {
         const email = req.query.email;
        //  console.log(email);
         if(!email){
          res.send([]);
         }
         const query = { email: email };
         const result = await cartCollection.find(query).toArray();
         res.send(result); 
     });

    app.post('/carts', async (req, res) => {
      const item = req.body;
      console.log(item);
      const result = await cartCollection.insertOne(item);
      res.send(result);
    });

    app.delete('/carts/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('boss is sitting')
})

app.listen(port, () => {
    console.log(`Bistro boss is sittion on port ${port}`);
})
