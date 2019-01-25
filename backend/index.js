require('dotenv').config();

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
    res.sendFile(path.join(__dirname+'/Views/index.html'));
})

app.post('/fibonacci', (req, res) => {

    const resFib = fibonacci(req.body.number);

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: 'result.json',
        Body: JSON.stringify({key: req.body.number, res : resFib})
    }

    s3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
            }
        }
    );

    res.send(JSON.stringify(resFib));
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server is listening on ${process.env.PORT}`)
})

const fibonacci = (n) => n > 2 ? (fibonacci(n - 1) + fibonacci(n - 2)) : 1;