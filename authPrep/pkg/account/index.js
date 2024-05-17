const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    email: String,
    password: String,
fullName: String,
wrongPassword: 
  {
   type: Number,
   default: 0,
  },
  succesfullLog: 
  {
    type: Number,
    default: 0,
   },
  resetPassword: 
  {
    type: Number,
    default: 0,
   },
})

const Student = mongoose.model("Student", studentSchema, "student");

const create = async (data) => {
    const newStudent = new Student(data);
    return await newStudent.save();
    };
    const update = async (id, data) => {
    return await Student.updateOne({_id: id }, {data});
    };
    
    const getById = async (id) => {
        console.log("I'm inside");
    // return await Student.findOne({ _id: id });
    return await Student.findById(id);
    };
    
    const getByEmail = async ( email ) => {
    return await Student.findOne({ email: email});
    };
    
    const setNewPassword = async (id, password) => {
    return await Student.updateOne({ _id: id }, {password});
    };
    
    const getAllEmailSorted = async () => {
    // return await Student.find({}).select({"ime:"}).sort({ email: 1});
    return await Student.find({}).sort({ email: 1});
    };
    
    const remove = async (id) => {
    // return await Student.deleteOne({_id: id});
    return await Student.findByIdAndDelete(id);
    };
    
    const updateWrongPassword = async (id, wrongPassword) => {
        wrongPassword++;
        console.log(wrongPassword);
      return await Student.updateOne({_id: id }, { wrongPassword });
      };
      const updateLogin = async (id, succesfullLog) => {
        succesfullLog++;
        return await Student.updateOne({ _id: id }, { succesfullLog });
      }
      
      const updateResetPassword = async (id, resetPassword) => {
        resetPassword++;
        return await Student.updateOne({ _id: id}, {resetPassword});
      
      };
    
    module.exports = {
    create,
    update,
    getById,
    getByEmail,
    setNewPassword,
    getAllEmailSorted,
    remove,
    updateWrongPassword,
    updateLogin,
    updateResetPassword,
    };