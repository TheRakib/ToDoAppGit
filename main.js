const express = require('express');
const app = express();
const sassMiddleware = require('node-sass-middleware');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const TodoTask = require("./models/TodoTask");

dotenv.config();

const path = require('path');
app.use(sassMiddleware({
    src: __dirname + '/sass/', 
    dest: __dirname + '/public/stylesheets/', 
    outputStyle: 'compressed' 
  }),
 
)
app.use(express.static(path.join(__dirname, 'public'))) 

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get('/',(req, res) => {
    res.render('todo.ejs');
    });

    //  input test
    // app.post('/',(req, res) => {
    //     console.log(req.body);
    //     });

        app.post('/',async (req, res) => {
            const todoTask = new TodoTask({
            content: req.body.content
            });
            try {
            await todoTask.save();
            res.redirect("/");
            } catch (err) {
            res.redirect("/");
            }
            });

        mongoose.set("useFindAndModify", false);
        mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
        console.log("Connected mongoDB!");
        
        app.listen(7700, () => console.log("Servern är igång"));
        });  