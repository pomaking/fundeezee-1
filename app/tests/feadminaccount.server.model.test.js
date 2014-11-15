'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Feadminaccount = mongoose.model('Feadminaccount');

/**
 * Globals
 */
var user, feadminaccount;

/**
 * Unit tests
 */
describe('Feadminaccount Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			feadminaccount = new Feadminaccount({
				// Add model fields
				// ...
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return feadminaccount.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Feadminaccount.remove().exec();
		User.remove().exec();

		done();
	});
});