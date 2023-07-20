import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Models from "./server/models";

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.get('/', (req, res) => {
    res.send("Backend Connected");
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
