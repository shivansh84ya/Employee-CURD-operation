const empmodel = require("../models/empmodel");


const homepage=(req, res)=>{
    res.render("home");
}

const insertpage=(req, res)=>{
    res.render("insert");
}

const formpage = (req, res)=>{
    const myprofile = req.file.filename;
    const empnewdata = new empmodel({
        empid : req.body.id,
        empname:req.body.nm,
        empdisgination:req.body.dis,
        empsalary:req.body.sal,
        empimage : myprofile
        
    })
    empnewdata.save().then((data)=>{
        res.render("insert")
    })
}


const searchpage= (req, res)=>{
    res.render("search");
}

const searchempdata = (req, res)=>{
    empmodel.find({empid :req.body.myid}).then((data)=>{
        let mydata = data
        res.render("searchrecords",{empdata : mydata})
    })
}

const displaypage = (req, res)=>{

    empmodel.find().then((data)=>{
        let mydataa = data ;
        res.render("display",{empdata:mydataa})
    })

}
 
const updatedatapage= (req, res)=>{
    
    empmodel.find().then((data)=>{
        let mydataa = data ;
        res.render("update",{empdataa:mydataa})
    })
}

const editdata = (req, res)=>{
    let myid = req.params.id;
    empmodel.find({_id:myid}).then((data)=>{
        let mydata = data ;
        res.render("editpage",{empeditdata: mydata})
        console.log(mydata)
    })
}

const editdatasave= (req, res)=>{
    let myempid = req.body.eid;
    let myempname = req.body.enm;
    let myempdisgination = req.body.edis;
    let myempsalary = req.body.esal;

    empmodel.findByIdAndUpdate({_id:req.body.mid},{

        empid:myempid,
        empname:myempname,
        empdisgination:myempdisgination,
        empsalary:myempsalary
    }).then((data)=>console.log("successfull data update "))
}


module.exports={
    homepage,
    insertpage,
    formpage,
    searchpage,
    searchempdata,
    updatedatapage,
    displaypage,
    editdata,
    editdatasave
}