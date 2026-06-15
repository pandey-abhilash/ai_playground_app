import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./route";

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
