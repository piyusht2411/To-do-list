const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task:{
        type: String,
        require:true
    }
})

const Task = mongoose.model('All-task', TaskSchema);
module.exports = Task;