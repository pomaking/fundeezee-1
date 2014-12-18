'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SchoolAdminContribFormSchema = new Schema(
        {
        'schoolName':String,
        'schoolState':String,
        'schoolZip': String,
        'ptaName': String,
        'membershipTerm': {
             type: String
        },
        'endDate': {
            type: Date,
            required: true
        },
        'individual':Boolean,
        'family':Boolean,
        'faculty':Boolean,
        'business':Boolean,
        'individualCost':Number,
        'familyCost':Number,
        'facultyCost':Number,
        'businessCost':Number,
        'taxExempt': String,
        'website': String,
        'membership':{
        "form_id": Number,
            "form_name": String,
            "form_fields": [{
            "field_id": Number,
            "field_title": String,
            "field_type": String,
            "field_value": String,
            "field_required": Boolean,
            "field_disabled": Boolean,
            "field_options":[{
                "option_id":Number,
                "option_title":String,
                "option_value": String
            }]
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
                "field_disabled": Boolean,
                "field_options":[{
                    "option_id":Number,
                    "option_title":String,
                    "option_value": String
                }]
            }]
        }
});

mongoose.model('SchoolAdminContribForm', SchoolAdminContribFormSchema);