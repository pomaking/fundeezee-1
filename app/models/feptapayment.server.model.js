'use strict';

var mongoose = require('mongoose'),
    user = mongoose.model('FEAccount'),
    Schema = mongoose.Schema;

var FEPTAPaymentSchema = new Schema(
    {
        schoolName: String,
        schoolState: String,
        ptaName: String,
        selectedMembership: String,
        selectedMembershipCost: Number,
        selectedContribution: [],
        selectedTextContribution: [],
        feAccountUser : { type: mongoose.Schema.Types.ObjectId, ref: 'FEAccount' },
        createDate:{
            type: Date,
            default: Date.now
        },
        endDate: Date,
        taxExempt: Boolean
    }
);

mongoose.model('PTAPayment', FEPTAPaymentSchema);
