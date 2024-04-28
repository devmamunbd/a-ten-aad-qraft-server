const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



//middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lskduub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();

    const AssmentCollection = client.db('Mountain').collection('Moun')

    //Read/ Get
    
      
    app.get('/', async(req, res) => {
      const cursor = AssmentCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    
    // all art craft
    app.get('/all', async(req, res) => {
      const cursor = AssmentCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // details page
    app.get('/details/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await AssmentCollection.findOne(query)
      res.send(result)
    })

    //myAllArt email
    app.get("/myCart/:email", async (req, res) => {
      const email = req.params.email;
      // console.log(req.params.email)
      const result = await AssmentCollection.find({email}).toArray();
      res.send(result)
    })

    

    //Create / Post
    app.post('/add', async(req, res)=> {
      const query = req.body;
      const result = await AssmentCollection.insertOne(query)
      res.send(result)
    })


    //update get
    app.get('/update/:id', async (req, res)=> {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await AssmentCollection.findOne(query)
      res.send(result)
    })


    // Update
    app.put('/update/:id', async (req, res)=> {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const updateCart = req.body;
      const cart = {
        $set: {
          photo: updateCart.photo,
          item: updateCart.item,
          subcategory: updateCart.subcategory,
          short: updateCart.short,
          price: updateCart.price,
          ratting: updateCart.ratting,
          emaxple: updateCart.emaxple,
          time: updateCart.time,
          stock: updateCart.stock
        }
      }
      const result = await AssmentCollection.updateOne(filter, cart, options)
      res.send(result)
    })

    //Delete
    app.delete('/my/:id', async(req, res)=> {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await AssmentCollection.deleteOne(query)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', async(req, res) => {
    res.send('Coffee Making Server Is Running')
})
app.listen(port, () => {
    console.log(`Coffee Server Is Running On Port: ${port}`)
})