'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SchoolAdminContribFormSchema = new Schema(
        {'userName': String,
        'schoolName':String,
        'state':String,
        'membership':{
        "form_id": Number,
            "form_name": String,
            "form_fields": [{
            "field_id": Number,
            "field_title": String,
            "field_type": String,
            "field_value": String,
            "field_required": Boolean,
            "field_disabled": Boolean
        }]
    },
    'contribution':{
        "form_id": Number,
        "form_name": String,
        "form_fields": [{
            "field_id": Number,
            "field_title": String,
            "field_type": String,
            "field_value": String,
            "field_required": Boolean,
            "field_disabled": Boolean
        }]
    }
});

mongoose.model('SchoolAdminContribForm', SchoolAdminContribFormSchema);