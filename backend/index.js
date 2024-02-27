import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:3000/',
        methods: ['GET' , 'PUT', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type'],
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome')
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('app connected');
    app.listen(PORT, () => {
        console.log(`Server running on: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
})