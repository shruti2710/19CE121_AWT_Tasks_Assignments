const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
const db = config.get('mongoURI');

mongoose
.connect(db, {useNewUrlParser : true})
.then(()=> console.log('Mongodb Connected...'))
.catch(err => console.log(err));

const Animal = require('./models/Animal.js');
const newAnimal = new Animal({
    name :'Red Panda',
    isEndangered : true
})
// newAnimal
// .save()
// .then(item => console.log(item))
// .catch(err => console.log(err));

// find the records 
Animal.find()
    .sort({date : -1}) //finding according to the latest (with latest date)
    .then(items => console.log(items));

// Update the existing records
// Animal
//     .findOneAndUpdate(
//         { _id : '61605371f9e7bacabccb9a17' },
//         { isEndangered : false }
//     )
//     .then (item => console.log(item));

// //after this above cmd of update dont forget to save it hence also run below code 
// newAnimal
// .save()
// .then(item => console.log(item))
// .catch(err => console.log(err));

//Delete the records
// Animal
//         .findOneAndDelete(
//             { _id : '61605151027948bb8cd082f9'},
//             { isEndangered : false}
//         )
//         .then(console.log('ITem deleted'));
