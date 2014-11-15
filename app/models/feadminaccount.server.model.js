'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Feadminaccount Schema
 */
var FeadminaccountSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true }
});

mongoose.model('Feadminaccount', FeadminaccountSchema);