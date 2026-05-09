import express from 'express';
import 'dotenv/config';
const app = express();
import cors from 'cors';
import helmet from 'helmet';
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is listen on the port  http://localhost:${PORT}`);
})

