require('dotenv').config();

import { fibonacciWithCache } from "./fibonacci";

const express = require('express');
const app = express();
const path = require('path');
const aws = require('aws-sdk');
const s3 = new aws.S3({
    accessKeyId: process.env.USER_KEY,
    secretAccessKey: process.env.USER_SECRET,
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Go to /fibonacci for calculations!!!');
})

app.get('/fibonacci', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

app.post('/fibonacci', (req, res) => {
    if (req.body.number < 0 || req.body.number > 1000) {
        res.send(JSON.stringify('number must be between 1 and 1000'));
    } else {
        fibonacciWithCache(req.body.number, s3, process.env.BUCKET_NAME)
        .then(data => res.send(JSON.stringify(data)));
    }
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server is listening on ${process.env.PORT}`)
})

