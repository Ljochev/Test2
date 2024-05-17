const mongoose = require("mongoose");

const subjectsSchema = mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Student",
    },
    math: String,
    coding: String,
    english: String,
});

const Subjects = mongoose.model("Subjects", subjectsSchema, "subjects");

const createSubjects = async (subjects) => {
    const newSubjects = new Subjects(subjects);
    return await newSubjects.save();
    };
    
    const updateSubjects = async (id, data) => {
    return await Subjects.updateOne({_id: id}, data);
    };
    
    const removeSubjects = async (id) => {
    return await Subjects.deleteOne({_id: id});
    };
    
    const listSortetName = async (userId) => {
    return await Subjects.find({user_id: userId}).sort({ime: 1});
    };
    
    const getOneSubjectsById = async (id) => {
        // console.log("I'm in getOneSubjectsById");
    return await Subjects.findOne({ _id: id});
    };

module.exports = {
    createSubjects,
    updateSubjects,
    removeSubjects,
    listSortetName,
    getOneSubjectsById,
};