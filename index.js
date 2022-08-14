const express = require('express');
const db = require('./config/mongoose');
const Task = require('./models/schema');
const path = require('path');
const vie = path.join(__dirname, 'views');

const app = express();

app.set('view engine', 'ejs');
app.set('views', vie);
app.use(express.urlencoded());
app.use(express.static('assets'));

app.post('/create-task', (req, resp) => {
    Task.create({
        task: req.body.task
    }, function (err, newTask) {
        if (err) {
            console.log("Error!");
            return;
        }
        console.log('*****', newTask);
        return resp.redirect('back');
    })
})

app.get('/', (req, resp) => {
    Task.find({}, (err, tasks) => {
        if (err) {
            console.log("err");
            return;
        }
        return resp.render('home', {
            Task_list: tasks
        })
    })
})
app.get('/delete-task', (req, resp) => {
    console.log("deleted",req.query)
    let id = req.query.id;

    Task.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("error!");
            return;
        }
        return resp.redirect('back');
    });

})

app.listen(4500, (err) => {
    if (err) {
        console.log("Error");
        return resp.send("Error during connecting port");
    }
    console.log("Succesfully connected to the port 4500");
})