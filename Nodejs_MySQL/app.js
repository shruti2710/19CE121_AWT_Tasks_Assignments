const express = require('express');
const exphbs = require('express-handlebars');
const mysql=require('mysql')

const app = express(); 
// configure handlebars
app.engine('hbs',exphbs({
    defaultLayout : 'main', //main handlebar should be displayed when first my website will be loaded
    extname: '.hbs',   //we can change extension using extname flags..so here we'll write .hbs extension which we r going to use
})); //instead of exhbs we can use hbs

app.set('view engine','hbs');


// Subject-Code, Subject-Name (Text-box)
// Institute-Name (Text-box)
// Department-Name (Text-box)
// Semester=>Dropdown menu


const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'StudentDetails'
});

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connected successfully to MySql server")
});

//db-create => create Database

app.get("/db-create", (req,res)=>{
    const dbquery="CREATE DATABASE IF NOT EXISTS StudentDetails";

    connection.query(dbquery,(err,result)=>{
        if(err) throw err;
        console.log("StudentDetails Database created successfully",result)
    })
});


//db-table => Create Table in University DB
app.get("/db-table", (req,res)=>{
    const dbtable=`CREATE TABLE IF NOT EXISTS studentInfo(
        SubjectCode varchar(10) NOT NULL,
        SubjectName varchar(50) NOT NULL,
        InstituteName varchar(50) NOT NULL,
        DepartmentName varchar(15) NOT NULL,
        Semester int(3) NOT NULL,
        PRIMARY KEY (SubjectCode))`

        // SHOW DATABASES => List the available DB from MySql server
    // connection.query("USE University",(err,result)=>{ // "Select Database"
    //     if(err) throw err;
        connection.query(dbtable,(err,result)=>{
            if(err) throw err;
            console.log("Table created successfully",result)
        });
    // });
});
   //middleware
   app.use(express.static("public"));
   app.use(express.urlencoded({extended:false}));
   
//db-insert => Insert Record into studentInfo Table

app.get('/form', function(req, res, next) { 
    // res.setHeader("Content-Type", "html/text");
    res.render('home');
});
app.post('/form', function(req, res,next) {
    // res.setHeader("Content-Type", "html/text");
    res.redirect("show-data");
});
app.post('/show-data', function(req, res,next) {
    // console.log(req.body.subjectcode);
     // store all the user input data
     var code = req.body.scode;
     var sname = req.body.sname;
     var iname = req.body.iname;
     var dname = req.body.dname;
     var sem = req.body.sem;

  
    const dbInsert=`INSERT INTO studentInfo(SubjectCode,SubjectName,InstituteName,DepartmentName,Semester) VALUES
    ("${code}","${sname}","${iname}","${dname}","${sem}")`;

    connection.query(dbInsert,(err,result)=>{
        if(err) throw err;
        console.log(result)
    })
    
    res.send("Data successfully inserted!");
    
});
   


app.get("/db-display", (req,res)=>{
    const dbdisplay=`SELECT * FROM studentInfo`
    connection.query(dbdisplay,(err,rows)=>{
        if(err) throw err;
        console.log('Data received');
        console.log(rows);
        console.log('------------------------------------')
        console.log(`Data : \n
        Code \tSubject\t\tInstitute \tdepartment\tSemester\n`);

        for (let index = 0; index < rows.length; index++) {
            let id = rows[index].SubjectCode;
            let sname = rows[index].SubjectName;
            let iname = rows[index].InstituteName;
            let dname = rows[index].DepartmentName;
            let semester = rows[index].Semester;

        
        console.log(`
        ${id} \t ${sname} \t\t ${iname} \t\t ${dname} \t\t ${semester} \n `);
        }
        
        })
});




app.listen(3000,()=>{
    console.log('Listening on port 3000..');
});

