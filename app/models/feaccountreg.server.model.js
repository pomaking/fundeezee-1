'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var FEAccountSchema = new Schema({
    FEAccount:{
        id: String,
        firstName: String,
        lastName: String,
        userName: String,
        schoolName: {
            type: String
        },
        schoolState: String,
        relationshipTitle: {
            type: String
        },
        state: {
            type: String,
            trim: true },
        zip: Number,
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
    SecondaryAcct: {
        secondaryId: String,
        firstName: String,
        lastName: String,
        userName: String
    },
    StudentInfo:[{
        nbr: Number,
        studentName: String,
        studentTeacherName: String,
        gradeLevel: Number}]
});

mongoose.model('FEAccount', FEAccountSchema);

