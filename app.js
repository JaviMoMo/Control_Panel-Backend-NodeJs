const express = require("express");
const {connect} = require("./config/db");
connect();
const app = express();
const cors = require("cors");
const logger = require("morgan");
const users = require("./api/routes/user.routes");
const tasks = require("./api/routes/task.routes");
const notes = require("./api/routes/note.routes");
const categories = require("./api/routes/category.routes");
const HTTPSTATUSCODE = require("./utils/httpStatusCode");

app.set("secretKey", "nodeRestApi");

app.listen(3000, () => {
    console.log("Node server is listening on port 3000")
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4200'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));

app.use("/users", users);
app.use("/tasks", tasks);
app.use("/notes", notes);
app.use("/categories", categories);

app.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = HTTPSTATUSCODE[404];
    next(err);
});

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

app.disable('x-powered-by');