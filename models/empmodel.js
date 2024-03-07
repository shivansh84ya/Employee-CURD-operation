const mongoose = require("mongoose");


const empschema = new mongoose.Schema({
    empid : String,
    empname:String,
    empdisgination:String,
    empsalary:String,
    empimage:String
})

module.exports= mongoose.model("employee",empschema)