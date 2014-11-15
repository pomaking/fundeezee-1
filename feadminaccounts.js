var mongoose = require('mongoose');

var db = mongoose.connection;


db.on('error', console.error);
db.once('open', function() {
    // Create your schemas and models here.
});

mongoose.connect('mongodb://localhost:27017/fedb');

var mongoose = require('mongoose'), Schema = mongoose.Schema;

/**
 * Feadminaccount Schema
 */
var FeadminaccountSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true }
});

mongoose.model('feadminaccount', FeadminaccountSchema);

var feadminaccount = mongoose.model('feadminaccount', FeadminaccountSchema);

//var feadminacct = new feadminaccount({
//firstName: 'David',
//lastName: 'Spencer' ,
//userName: 'spencer@orgora.com'
//});
//
//feadminacct.save(function(err, feadminacct) {
//if (err) return console.error(err);
//console.dir(feadminacct);
//});

//var feadminacct = new feadminaccount({
// firstName: 'David',
// lastName: 'Wible' ,
// userName: 'ddwible@gmail.com'
// });
//
// feadminacct.save(function(err, feadminacct) {
// if (err) return console.error(err);
// console.dir(feadminacct);
// });

//var feadminacct = new feadminaccount({
// firstName: 'Kent',
// lastName: 'Hamilton' ,
// userName: 'gkh1974@gmail.com'
// });
//
// feadminacct.save(function(err, feadminacct) {
// if (err) return console.error(err);
// console.dir(feadminacct);
// });
