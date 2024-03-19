const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 80;

const databasePath = "mongodb+srv://prabuThiruKural:prabuThiruKural@prabu.fiuigwk.mongodb.net/?retryWrites=true&w=majority&appName=prabu";

const databaseName = "ThiruKuralDatabase";
const collectionName = "ThiruKural";


app.use(cors());

app.get('/getThiruKural', async(req, res) => {
    const client = new MongoClient(databasePath);
    const number = parseInt(req.query.number);

    try{
        console.log(number);

        if (isNaN(number) || number <= 0 || number > 1330) {
            throw new Error('Invalid number. Number must be between 1 and 1330 (inclusive both).');
        }

        await client.connect();
        const db = client.db(databaseName);

        const collection = db.collection(collectionName);

        const [result] = await collection.find({ 'number' : number }, { "_id" : -1 }).toArray();


        res.json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
    finally{
        await client.close();
    }

})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
