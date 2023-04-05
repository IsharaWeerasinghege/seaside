import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import multer from 'multer';
import {fileURLToPath} from 'url';
import path from 'path';

import routes from './routes/routes.js';
import {verifyToken} from "./middleware/auth.js";
import {createYacht} from "./routes/admin.js";

const PORT = process.env.PORT || 3001;

// configuration
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

const config = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + Date.now().toString() + path.extname(file.originalname);
        cb(null, fileName);

    }
});

const upload = multer({
    storage: config,
}).single('image');

// connect to database
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(() => {
        console.log('database connection failed. exiting now...');
    });

// routes
app.use('/', routes);
app.use('/yacht/create', verifyToken, upload, createYacht);


// listen to port
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})