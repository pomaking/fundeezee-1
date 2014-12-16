'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var FEAccountSchema = new Schema({
    FEAccount: {
        id: String,
        firstName: String,
        lastName: String,
        userName: String,
        state: {
            type: String,
            trim: true
        },
        zip: String,
        createDate: {
            type: Date,
            default: Date.now
        }
    },
    SecondaryAcct: {
        secondaryId: String,
        firstName: String,
        lastName: String,
        userName: String,
        state: {
            type: String,
            trim: true
        },
        zip: String,
        createDate:  {
            type: Date,
            default: Date.now
        }
    },
    Membership: [{
        orgType: String,
        schoolName: {
            type: String
        },
        schoolState: String,
        relationshipTitle: {
            type: String
        },
        stateId: {
            type: String,
            default: ''},
        nationalId: {
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
    }],
    StudentInfo:[{
        nbr: Number,
        studentName: String,
        dob:String
    }]
});

mongoose.model('FEAccount', FEAccountSchema);

