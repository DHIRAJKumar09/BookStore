const express= require('express');
const mongoose = require('mongoose');
const router = require('./Routes/UserRoute');
const bookRouter = require('./Routes/BookRoutes');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect('mongodb://127.0.0.1:27017/mern')
.then(()=>{
    console.log("database is connected");
})
.catch((error)=>{
    console.error(error);
})

app.use("/mern/v1",router);
app.use("/mern/v2",bookRouter);
app.listen(process.env.PORT|| 7000,()=>{
    console.log(`SERVER IS CONNECTED ${process.env.PORT}`);
})