const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { remove_News, archive_News, get_news, create_news } = require('./Controllers/newsControllers');

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


app.use(express.json());


app.put('/remove-news', remove_News);
app.put('/archive-news', archive_News);
app.get('/get-news', get_news);
app.post('/create-news', create_news);


/*
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

const newsItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
    content: String,
    author: String,
    archiveDate: { type: Date, default: null },
    removed: { type: Boolean, default: false }
});

const News = mongoose.model('News', newsItemSchema);

app.get('/', async (req, res) => {
    try {
        const newsItemsList = await News.find({ removed: false });
        res.json(newsItemsList);
    } catch (error) {
        console.error('Error getting news items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/news', async (req, res) => {
    try {
    
        const { title, description, content, author } = req.body;

        const newNewsItem = new NewsItem({
            title: title,
            description: description,
            content: content,
            author: author
        });

        const savedNewsItem = await newNewsItem.save();

        res.status(201).json(savedNewsItem);
    } catch (error) {
        console.error('Error creating news item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


*/