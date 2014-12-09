'use strict';

/**
 * Module dependencies.
 */
//var users = require('../../app/controllers/users.server.controller'),     articles = require('../../app/controllers/articles.server.controller');

var ptaPayment = require('../../app/controllers/ptapayment.server.controller.js');


module.exports = function(app) {
    // Article Routes
    app.route('/api/ptapayment/')
        .post(ptaPayment.savefeptapmt);

    app.route('/api/ptapayment/bystate/:stateAbbr')
        .get(ptaPayment.findbyStateAbbr);

    app.route('/api/ptapayment/byschool/:schoolname/:schoolstate')
        .get(ptaPayment.findbySchoolName);

    app.route('/api/ptapayment/username/:username')
        .get(ptaPayment.findbyUsername);



    //app.route('/api/ptaregistration/schoolname/:schoolname')
    //    .get(feAccount.findbySchoolName);


    //.put(users.requiresLogin, articles.hasAuthorization, articles.update)
    //.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

    // Finish by binding the article middleware
    // app.param('feAccountUsername', feAccount.findbyUsername);
};