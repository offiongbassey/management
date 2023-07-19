const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const sequelize = require("./server/config/Database");
require("dotenv").config({path: path.resolve(__dirname, "./.env")});

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("Backend Connected");
});

sequelize.sync()
.then(() => {
    console.log("DB Successfully Synced");
})
.catch((error) => {
    console.log(`DB failed to sync ${error}`);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http:127.0.0.1:${PORT}`);
});
