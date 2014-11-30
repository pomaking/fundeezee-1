'use strict';

/**
 * Module dependencies.
 */
//var users = require('../../app/controllers/users.server.controller'),     articles = require('../../app/controllers/articles.server.controller');

var contrib = require('../../app/controllers/schooladmincontrib.server.controller');

module.exports = function(app) {

    app.route('/api/schooladmincontrib/')
        .post(contrib.createSchoolAdminContribForm);

    // update existing school admin contrib form
    app.route('/api/schooladmincontrib/')
        .put(contrib.updateSchoolAdminContribForm);

    app.route('/api/schooladmincontrib/findbyusername/:username')
        .get(contrib.findbyUsername);

    //schoolname & state
    app.route('/api/schooladmincontrib/findbyschool/:schoolname/:schoolstate')
        .get(contrib.findbySchoolName);

    app.route('/api/schooladmincontrib/helloworld/')
        .get(contrib.helloWorld);







};