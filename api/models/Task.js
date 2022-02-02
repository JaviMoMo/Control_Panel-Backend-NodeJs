const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String},
        category: [{type: Schema.Types.ObjectId, ref: "category", required: true}],
        notes: [{type: Schema.Types.ObjectId, ref: "note"}]
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("task", TaskSchema);
module.exports = Task;