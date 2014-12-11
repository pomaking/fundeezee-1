'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    FEAccount = mongoose.model('FEAccount'),
    _ = require('lodash');


    exports.createfeaccount = function(req, res) {
        // create an instance/object out of the model
        var feAcct = {};
        feAcct = req.body;
        console.dir('createfeaccount: ' + JSON.stringify(feAcct));
        var id = mongoose.Types.ObjectId();
        feAcct.FEAccount.id = id;

        if(feAcct.SecondaryAcct) {
            id = mongoose.Types.ObjectId();
            feAcct.SecondaryAcct.secondaryId = id;
        }

        var newAccount = new FEAccount(feAcct);

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

        console.dir('schoolname ' + schoolName);
        FEAccount.find({ 'FEAccount.schoolName': schoolName, 'FEAccount.schoolState': schoolAbbr }, function(err, ptaregforms) {
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

    /**
     * Show the current article
     */
    exports.findbyUsername = function(req, res) {
        var userName = req.params.username.substring(1);

        console.dir('username:' + userName);
        FEAccount.findOne({ 'FEAccount.userName': userName }, function(err, ptaregforms) {
            if (err) return next(err);
            if (!ptaregforms)
                return next(new Error('Failed to load user by username ' + userName));

            res.json(ptaregforms);

        });
    };

    exports.findbyStateAbbr = function(req, res) {
        var stateAbbr = req.params.stateAbbr.substring(1).trim();

        console.dir('stateAbbr ' + stateAbbr);
        FEAccount.find({ 'FEAccount.schoolState': stateAbbr }, function(err, ptaregforms) {
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

    exports.readHelloWorld = function(req, res) {
        console.log('processing');
        res.json('hello world');
    };

/**
 * Update a article
 */
/*exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};*/

/**
 * Delete an article
 */
/*exports.delete = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};*/

/**
 * List of Articles
 */
/*
exports.list = function(req, res) {
    Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(articles);
        }
    });
};

*/
/**
 * Article middleware
 *//*

exports.articleByID = function(req, res, next, id) {
    Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

*/
/**
 * Article authorization middleware
 *//*

exports.hasAuthorization = function(req, res, next) {
    if (req.article.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};*/

