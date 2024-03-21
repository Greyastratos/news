const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const { remove_News, archive_News, get_news, create_news, get_archived, get_unarchived } = require('./Controllers/newsControllers');

const app = express();
const port = 5000;

//normalmente lo pondria en un archivo .env a fines practicos del ejercicio puse directamente  la direccion aqui 
const uri = "mongodb+srv://greyisinsoft:IMcRjuE4Vqx2rkk8@cluster0.gea15wt.mongodb.net/";



const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(cors());
app.use(express.json());


app.put('/remove-news', remove_News);
app.put('/archive-news', archive_News);
app.get('/get-news', get_news);
app.get('/get-archived-news', get_archived);
app.get('/get-unarchived', get_unarchived);
app.post('/create-news', create_news);
