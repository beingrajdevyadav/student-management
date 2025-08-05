// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/student.model.js');


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


// Create
app.post('/students', async(req, res)=>{
    const student = new Student(req.body);
    await student.save();
    res.send(student);
});


// Read All
app.get("/students", async(req, res)=>{
    const students = await Student.find();
    res.send(students);
});


// Update
app.put("/students/:id", async(req, res)=>{
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body,{new : true} );

        if(!student)return res.status(404).send({message: "Student Not Found"});
        
    res.send(student);
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
    
});

// Delete
app.delete("/students/:id", async(req, res)=>{
    await Student.findByIdAndDelete(req.params.id);
    res.send({message: "Deleted"});
});

// URL SEARCH
app.get("/students/search", async(req, res)=>{
    try {
        const {name, city, course, minAge, maxAge} = req.query;

        let filter = {};

        if(name) filter.name = {$regex:name, $options: "i"};
        if(city) filter.city = city;
        if(course) filter.course = course;

        if(minAge || maxAge){
            filter.age = {};
            if(minAge) filter.age.$gte = parseInt(minAge);
            if(maxAge) filter.age.$lte = parseInt(maxAge);
        };

        const students = await Student.find(filter);
        res.send(students);
    } catch (error) {
       res.status(500).send({error: error.message}); 
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server serving on port ${process.env.PORT}`);
});



