const express = require('express');
const TodoTask = require('../models/TodoTask');
const router = express.Router(); 


router.get("/", (req, res) => {
        TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
        });
        });
    
            router.post('/',async (req, res) => {
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
    
    router.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
    })
    .post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    });
    
    router.route("/remove/:id").get((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
        });
        });

module.exports = router;