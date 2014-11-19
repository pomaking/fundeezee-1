'use strict';

/**
 * Module dependencies.
 */
//var users = require('../../app/controllers/users.server.controller'),     articles = require('../../app/controllers/articles.server.controller');

var contrib = require('../../app/controllers/schooladmincontrib.server.controller');

module.exports = function(app) {

    app.route('/api/schooladmincontrib/helloworld/')
        .get(contrib.helloWorld);

    app.route('/api/schooladmincontrib/findbyusername/:username')
        .get(contrib.findbyUsername);

};