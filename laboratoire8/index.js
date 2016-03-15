var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log("Running on " + port + " localhost");
});
