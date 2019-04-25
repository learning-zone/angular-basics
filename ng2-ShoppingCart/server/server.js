/* Minimal Node Server for development */
var express = require('express');
var app = express();

app.get('/api', (req,res) => {
    console.log('get request for route /api')
})

app.get('/api/:id', (req,res) => {
    console.log(req.params.id)
})

app.listen(3000, function() {
    console.log('Listening on PORT: 3000')
})