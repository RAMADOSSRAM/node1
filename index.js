
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

const app = express();

// const PORT = process.env.PORT;
const PORT =4000
    app.use(express.json());
    dotenv.config();
    console.log(process.env);
    // const MONGO_URL = "mongodb://127.0.0.1"; //  nodejs - 16+
    const MONGO_URL = process.env.MONGO_URL;
    // Node - MongoDB
    async function createConnection() {
      const client = new MongoClient(MONGO_URL);
      await client.connect();
      console.log("Mongo is connected ✌😊");
      return client;
    }
    
    const client = await createConnection();
     
app.get('/', function (req, res) {
  res.send('Hello World')
});
app.get('/movies', async function (req, res) {
    const movies = await client
.db("b33wd")
.collection("movies")
.find({})
.toArray();
    res.send(movies)
  });
 app.get('/movies/:id', async function (req, res) {
const {id} = req.params;
// const movie =movies.find((m)=>m.id == id);
const movie = await client
.db("b33wd")
.collection("movies")
.findOne({id:id});
movie ? res.send(movie)
:res.status(404).send("no movies found");
});

app.post('/movies', async function (req, res) {
const data = req.body;
console.log(data);
const result = await client.db("b33wd").collection("movies").insertMany(data);
res.send(result);
});

app.listen(PORT,()=>console.log("start"));