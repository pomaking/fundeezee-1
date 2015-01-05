'use strict';

var mongoose = require('mongoose'),
    user = mongoose.model('FEAccount'),
    Schema = mongoose.Schema;

var FEPTAPaymentSchema = new Schema(
    {
        schoolName: String,
        schoolState: String,
        schoolContribId: String,
        memberContribution: String,
        feAccountUser : { type: mongoose.Schema.Types.ObjectId, ref: 'FEAccount' },
        createDate:{
            type: Date,
            default: Date.now
        },
        endDate: String,
        taxExempt: String
    }
);

mongoose.model('PTAPayment', FEPTAPaymentSchema);
