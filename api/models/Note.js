const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = new Schema(
    {
        title: {type: String, required: true},
        text: {type: String},
        category: {type: Schema.Types.ObjectId, ref: "category"},
        tasks: [{type: Schema.Types.ObjectId, ref: "task"}]
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model("note", NoteSchema);
module.exports = Note;