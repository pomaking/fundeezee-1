'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    FEPTAPayment = mongoose.model('PTAPayment'),
    _ = require('lodash');


exports.savefeptapmt = function(req, res) {
    // create an instance/object out of the model
    var newAccount = new FEPTAPayment(req.body);

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

exports.findbySchoolName = function(req, res) {
    var schoolName = req.params.schoolname.substring(1);
    var schoolAbbr = req.params.schoolstate.substring(1);
    console.dir('schoolname/state ' + schoolName + ' ' + schoolAbbr);
    FEPTAPayment.find({ 'schoolName': schoolName, 'schoolState': schoolAbbr }).populate('feAccountUser').exec( function(err, ptaregforms) {
        if (err)
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        if (!ptaregforms)
            return res.status(404).send({
                message: errorHandler.getErrorMessage(err)
            });
        res.json(ptaregforms);

    });
};

// trying to synch with git
/*
 ptaPayment.find({ 'schoolName': 'JOHNS CREEK ELEMENTARY', 'schoolState': 'GA' })
 .populate('feAccountUser').exec( function(err, ptaregforms) {
 if (err)
 return res.status(400).send({
 message: errorHandler.getErrorMessage(err)
 }
 );
 if (!ptaregforms)
 return res.status(404).send({
 message: errorHandler.getErrorMessage(err)
 }
 );
 console.log(ptaregforms);

 });


 */
/**
 * Show the current article
 */
exports.findbyUsername = function(req, res) {
    var userName = req.params.username.substring(1);

    console.dir('username:' + userName);
    FEPTAPayment.find({ 'userName': userName }, function(err, ptaregforms) {
        if (err) return next(err);
        if (!ptaregforms)
            return next(new Error('Failed to load user by username ' + userName));

        res.json(ptaregforms);

    });
};

exports.findbyStateAbbr = function(req, res) {
    var stateAbbr = req.params.stateAbbr.substring(1).trim();

    console.dir('schoolState ' + stateAbbr);
    FEPTAPayment.find({ 'schoolState': stateAbbr }, function(err, ptaregforms) {
        if (err)
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        if (!ptaregforms)
            return res.status(404).send({
                message: errorHandler.getErrorMessage(err)
            });
        res.json(ptaregforms);

    });
};
