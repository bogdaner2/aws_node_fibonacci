const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('New server')
})
app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server is listening on ${port}`)
})