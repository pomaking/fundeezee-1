'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var FEAccountSchema = new Schema({
    FEAccount:{
        schoolName: {
            type: String
        },
        firstName: String,
        lastName: String,
        userName: String,
        relationshipTitle: {
            type: String,
            values: {}
        },
        state: String,
        county: String,
        statePTAId: {
            type: String,
            default: ''},
        nationalPTAId: {
            type: String,
            default: ''},
        adminApprovedBy: {
            type: String
        }
    },
    StudentInfo:[{
        studentFirstName: String,
        studentLastName: String,
        studentTeacherName: String,
        gradeLevel: Number}]
});

mongoose.model('FEAccount', FEAccountSchema);

