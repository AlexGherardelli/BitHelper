'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
const UsersSchema = new Schema({
    githubId: String, 
    username: String,     //username
    displayName: String,  //display name
    avatar: String,       //avatar image URL, can be empty
    skillset: [String],   //array of strings, like "React" and "Nodejs"
    email: String,        //email address
    projects: [String]    //array of project IDs that this user has created
});

//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);