const express = require("express");
const app = express();

app.get('/',(req, res) => {
    res.send('TestTest!');
    });

app.listen(7700, () => console.log("Servern funkar!"));