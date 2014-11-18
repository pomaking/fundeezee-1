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
            type: String
        },
        state: {
            type: String,
            trim: true },
        statePTAId: {
            type: String,
            default: ''},
        nationalPTAId: {
            type: String,
            default: ''},
        isSchoolAdmin:{
            type: Boolean,
            default: false
        },
        adminApprovedBy: {
            type: String,
            default: ''
        },
        createDate:{
            type: Date,
            default: Date.now
        }
    },
    StudentInfo:[{
        studentFirstName: String,
        studentLastName: String,
        studentTeacherName: String,
        gradeLevel: Number}]
});

mongoose.model('FEAccount', FEAccountSchema);

