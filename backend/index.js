const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('New server');
})

app.get('/fibonacci', (req, res) => {
    res.sendFile(path.join(__dirname+'/Views/index.html'));
})

app.post('/fibonacci', (req, res) => {
    res.send(JSON.stringify(fibonacci(req.body.number)));
})

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server is listening on ${port}`)
})

const fibonacci = (n) => n > 1 ? (fibonacci(n - 1) + fibonacci(n - 2)) : 1;