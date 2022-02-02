const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_DB;
const connect = async () => {
    try {
        const db = await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const {name, host} = db.connection;
        console.log(`Connected with db: ${name}, in host: ${host}`);
    } catch (error) {
        console.log("Error to connect with db", error);
    }
};

console.log(mongoDB)

module.exports = {connect};