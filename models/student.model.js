// models/student.model.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
    course: String,
    admissionDate : {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model("Student", studentSchema);