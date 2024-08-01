const express = require('express');
const app = express();
const host = '127.0.0.1'
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
