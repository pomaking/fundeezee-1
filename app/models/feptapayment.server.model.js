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
        username: [String],
        feAccountUser : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        createDate:{
            type: Date,
            default: Date.now
        },
        endDate: Date,
        taxExempt: Boolean
    }
);

mongoose.model('PTAPayment', FEPTAPaymentSchema);
