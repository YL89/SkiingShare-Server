var express = require('express');
var Cor = require('cor');

var app = express();

var HTTP_PORT = process.env.PORT || 8080;





app.listen(HTTP_PORT, ()=>{
    console.log("App launched!");
})