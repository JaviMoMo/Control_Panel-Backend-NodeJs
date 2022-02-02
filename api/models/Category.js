const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: false},
        notes: [{type: Schema.Types.ObjectId, ref: "note"}],
        tasks: [{type: Schema.Types.ObjectId, ref: "task"}]
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;