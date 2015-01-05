'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    schoolcontrib = mongoose.model('SchoolAdminContribForm'),
    balanced = require('balanced-official'),
    _ = require('lodash');

balanced.configure("ak-test-1p1Tsac7gHeMQowL2seB7ieliuAJAufyq");

exports.findbyUsername = function(req, res)  {
    var userName = req.params.username.substring(1).trim();

    console.dir('userName ' + userName);
    schoolcontrib.find({ 'userName': userName }, function(err, schoolContribforms) {
        if (err)
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        if (!schoolContribforms)
            return res.status(404).send({
                message: errorHandler.getErrorMessage(err)
            });
        res.json(schoolContribforms);

    });
};

exports.findbySchoolName = function(req, res)  {
    var schoolName = req.params.schoolname.substring(1).trim();
    var stateAbbr = req.params.schoolstate.substring(1).trim();
    console.log('params: schoolName ' + schoolName + ' stateAbbr' + stateAbbr);

    schoolcontrib.find({ 'schoolName':schoolName, 'schoolState':  stateAbbr }, function(err, schoolContribforms) {
        if (err)
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        if (!schoolContribforms)
            return res.status(404).send({
                message: errorHandler.getErrorMessage(err)
            });
        res.json(schoolContribforms);

    });
};

exports.findSchoolName = function(req, res)  {
    var schoolName = req.params.schoolname.substring(1).trim();
    var schoolLocation = req.params.schoollocation.substring(1).trim();


    console.log('params: schoolName ' + schoolName + ' schoolLocation: ' + schoolLocation );

    if(/^\d*$/.test(schoolName) ){
        console.log("in the school zip lookup...");
        schoolcontrib.find({"schoolState": schoolLocation.toUpperCase(), "schoolZip": schoolName}, function (err, schoolContribforms) {
            if (err)
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            if (!schoolContribforms)
                return res.status(404).send({
                    message: errorHandler.getErrorMessage(err)
                });
            res.json(schoolContribforms);

        });
    }
    else{
        console.log("in the school name lookup...");
        schoolcontrib.find({"schoolState": schoolLocation.toUpperCase(), "schoolName": new RegExp(schoolName, "i")}, function (err, schoolContribforms) {
            if (err)
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            if (!schoolContribforms)
                return res.status(404).send({
                    message: errorHandler.getErrorMessage(err)
                });
            res.json(schoolContribforms);

        });
    }

};

exports.createSchoolAdminRegisterBank = function(req, res) {
    // create an instance/object out of the model
    // balanced.
    console.log(req.body);

    var payload = {
        name: req.body.bankAcctNickname,
        account_number: req.body.bankAcct,
        routing_number: req.body.bankRouting,
        account_type: req.body.bankAcctType
    };
    // Tokenize bank account
    var x = balanced.marketplace.bank_accounts.create(payload, handleResponse);
    JSON.stringify('bank accounts create resp ' + x);
};

    function handleResponse(response) {
        // Successful tokenization
        if (response.status_code === 201) {
            // 'save' the instance to mongodb
            console.log('success adding acct');
            res.json('success');
        }
        else{
            return res.status(400).send({
                message: 'unsuccessful in adding your acct...'
            });
        }
    }



// createSchoolAdminContribForm
exports.createSchoolAdminContribForm = function(req, res) {
    // create an instance/object out of the model
    var newAccount = new schoolcontrib(req.body);

    // 'save' the instance to mongodb
    newAccount.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(newAccount);
        }
    });
};

exports.updateSchoolAdminContribForm = function(req, res) {
    // alternative if needed...
    // var query = { schoolName: req.body.schoolName, state: req.body.state };
    // Model.findOneAndUpdate(query, { name: 'jason borne' }, options, callback)
    var newAccount = new schoolcontrib(req.body);
    console.dir('update school admin (by ID): ' + JSON.stringify(req.body._id));

    // Model.findByIdAndUpdate(id, [update], [options], [callback])
    schoolcontrib.findByIdAndUpdate(req.body._id, req.body, {
        "multi" : false,  // update only one document
        "upsert" : true  // insert a new document, if no existing document match the query
    }, function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(newAccount);
        }
    });
};

exports.helloWorld = function(req, res)  {
    //var userName = req.params.username.substring(1).trim();
    res.json('hello world david');
};

