
//Required
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
//tell the server to use body-parser middleware to automatically parse JSON data sent in the request body.
app.use(cors());
//allows our server to handle requests from different origins (frontend and backend running on different ports).

//connect with database
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//define schema
const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

//data collection
const Data = mongoose.model('Data',dataSchema);

//to create data
app.post('/api/data', async (req, res) => {
    const data = new Data(req.body);
    try {
        await data.save();
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
});

//to retrieve data
app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

//to start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
