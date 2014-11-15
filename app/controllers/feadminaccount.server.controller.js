'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    feadminaccount = mongoose.model('FeadminaccountSchema'),
    _ = require('lodash');


/**
 * Show the current article
 */
exports.findbyUsername = function(userName) {

    feadminaccount.findOne({ 'userName': userName }, function(err, data) {
        if (err)
            return console.error(err);
        else
            return data;
    });
};


