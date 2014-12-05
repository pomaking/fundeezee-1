'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SchoolAdminContribFormSchema = new Schema(
        {

        'schoolName':String,
        'schoolState':String,
        'ptaName': String,
        'Individual':Boolean,
        'Family':Boolean,
        'Faculty':Boolean,
        'Business':Boolean,
        'IndividualCost':Number,
        'FamilyCost':Number,
        'FacultyCost':Number,
        'BusinessCost':Number,
        'taxExempt': Boolean,

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