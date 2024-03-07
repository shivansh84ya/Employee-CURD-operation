const express = require("express");
const app = express();
const empcontrollers = require("./controllers/empcontroller")
const bodyparser = require("body-parser");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/company").then(()=>console.log("connection successfull ")).catch((err)=>console.log("Error in connection "+err))

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        return cb(null, "public/images")
    },
    filename:(req, file, cb)=>{
        return cb(null , `${Date.now()}-${file.originalname}`)
    }
})
const uploads = multer({storage:storage});

app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/",empcontrollers.homepage)

app.get("/insert",empcontrollers.insertpage)

app.get("/search",empcontrollers.searchpage)

app.post("/form",uploads.single("pro"), empcontrollers.formpage);

app.post("/searchdata", empcontrollers.searchempdata)

// app.get("/update", empcontrollers.updatepage)

app.get("/display", empcontrollers.displaypage)

app.get("/update",empcontrollers.updatedatapage)

app.get("/edit/:id", empcontrollers.editdata)

app.post("/updatedatasave", empcontrollers.editdatasave)

// app.post("/updatedatasave", empcontrollers.editdatasave)


app.listen(8000,function(req, res){
    console.log("run on 8000 port");
})