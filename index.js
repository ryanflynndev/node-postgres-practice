const express = require('express');
const app = express();
const pool = require('./db');



app.listen(8080, () => {
    console.log("Listening on port 8080")
});