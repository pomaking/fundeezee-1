'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    schoolcontrib = mongoose.model('SchoolAdminContribForm'),
    _ = require('lodash');


/**
 * Show the current article
 */
//exports.findbyUsername = function(req, res)  {
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

exports.helloWorld = function(req, res)  {
    //var userName = req.params.username.substring(1).trim();
    res.json('hello world david');
};

