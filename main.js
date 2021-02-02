const express = require("express");
const app = express();
const sassMiddleware = require('node-sass-middleware');

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

    // input test
    app.post('/',(req, res) => {
        console.log(req.body);
        });

app.listen(7700, () => console.log("Servern funkar!"));