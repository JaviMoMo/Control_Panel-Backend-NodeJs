const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        userName: {type: String, trim: true, required: true},
        email: {type: String, trim: true, required: true},
        pass: {type: String, trim: true, required: true},
        fullName: {type: String, trim: true, required: true},
        categories: [{type: Schema.Types.ObjectId, ref: "category"}],
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", function (next) {
    this.pass = bcrypt.hashSync(this.pass, saltRounds);
    next();
});

const User = mongoose.model("user", UserSchema);
module.exports = User;