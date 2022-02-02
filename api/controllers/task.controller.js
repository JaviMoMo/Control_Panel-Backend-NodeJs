const Task = require("../models/Task");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const newTask = async (req, res, next) => {
    try {
        const newTask = new Task();
        newTask.title = req.body.title;
        newTask.description = req.body.description;
        newTask.tasks = [];
        newTask.tasks = [];
        newTask.author = req.authority.id;
        const taskDb = await newTask.save()
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: {tasks: taskDb}
        });
    } catch (err) {
        return next(err);
    }
}

const getAllTasks = async(req, res, next) => {
    try {
        const tasks = await Task.find().populate("category").populate("author").populate("notes");
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { tasks: tasks }
        });
    } catch (err) {
        return next(err);
    }
}

const getTaskById = async(req, res, next) => {
    try {
        const {taskId} = req.params;
        const taskDb = await Task.findById(taskId).populate("category").populate("author").populate("notes");
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { tasks: taskDb }
        });
    } catch (err) {
        return next(err)
    }
}

const getTaskByTitle = async(req, res, next) => {
    try {
        const {taskTitle} = req.params;
        const taskDb = await Task.find({title: taskTitle}).populate("author").populate("category").populate("notes");
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { tasks: taskDb }
        });
    } catch (err) {
        return next(err)
    }
}

const getFilterTasks = async (req, res, next) => {
    try {
        const filters = req.query;
        const tasks = await Task.find(filters);
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: {tasks: tasks}
        });
    } catch (err) {
        return next(err);
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const {_id} = req.body;
        await Task.deleteOne({_id: id})
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: {task: `${_id} deleted`}
        })
    } catch (err) {
        return next(err)
    }
}

const updateTask = async (req, res, next) => {
    try{
        const {id} = req.body;
        const task = await Task.findByIdAndUpdate({id: id}, {id: id, title: req.body.title, description: req.body.description})
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { task: `${task.task} updated`}
        })
    } catch (err){
        return next(err)
    }
}

module.exports = {
    newTask,
    getAllTasks,
    getTaskById,
    getTaskByTitle,
    getFilterTasks,
    deleteTask,
    updateTask
}