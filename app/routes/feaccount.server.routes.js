'use strict';

/**
 * Module dependencies.
 */
//var users = require('../../app/controllers/users.server.controller'),     articles = require('../../app/controllers/articles.server.controller');

var feAccount = require('../../app/controllers/feaccount.server.controller');

module.exports = function(app) {
    // Article Routes
    app.route('/api/ptaregistration/')
        .post(feAccount.createfeaccount);

    app.route('/api/ptaregistration/bystate/:stateAbbr')
        .get(feAccount.findbyStateAbbr);

    app.route('/api/ptaregistration/byschool/:schoolname/:schoolstate')
        .get(feAccount.findbySchoolName);

    app.route('/api/ptaregistration/username/:username')
        .get(feAccount.findbyUsername);



    //app.route('/api/ptaregistration/schoolname/:schoolname')
    //    .get(feAccount.findbySchoolName);


        //.put(users.requiresLogin, articles.hasAuthorization, articles.update)
        //.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

    // Finish by binding the article middleware
   // app.param('feAccountUsername', feAccount.findbyUsername);
};