const express = require('express');
const app = express();
const sassMiddleware = require('node-sass-middleware');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = require('./routes/todoRoute');

dotenv.config();

const path = require('path');
app.use(sassMiddleware({
    src: __dirname + '/sass/', 
    dest: __dirname + '/public/stylesheets/', 
    outputStyle: 'compressed' 
  }),
)

app.use(express.static(path.join(__dirname, 'public')));
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.set("view engine", "ejs");

        mongoose.set("useFindAndModify", false);
        mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("Connected mongoDB!");
        
        app.listen(7700, () => console.log("Servern är igång"));
        });  