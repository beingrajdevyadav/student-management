// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());


// db connection
mongoose.connect(process.env.DB_CONN)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log("DB Connection Error: " , err);
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server serving on port ${process.env.PORT}`);
});

