import express from 'express';
import 'dotenv/config';
// const app = express();
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
const PORT = process.env.PORT || 3000;


import connectDB from "./config/db.js";
import app from "./app.js";

connectDB();

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


app.listen(PORT, () => {
    console.log(`Server is listen on the port  http://localhost:${PORT}`);
})

