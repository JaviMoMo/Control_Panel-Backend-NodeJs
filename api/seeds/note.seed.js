const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Note = require("../models/Note");

const notes = [
    {
       
    }
]

const mongoDb = process.env.MONGO_DB;

mongoose
.connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    const allNotes = await Note.find();
    if (allNotes.length){
        await Note.collection.drop();
        console.log("Drop database")
    }
})
.catch((err) => console.log(`Error deletig data: ${err}`))
.then(async () => {
    await Note.insertMany(notes);
    console.log("Database created")
})
.catch((err) => console.log(`Error creating data: ${err}`))
.finally(() => mongoose.disconnect());