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
var SchoolAdminContribFormSchema = new Schema(
          {'userName': String,
        'schoolName':String,
        'state':String,
        'membership':{
        "form_id": Number,
            "form_name": String,
            "form_fields": [{
            "field_id": Number,
            "field_title": String,
            "field_type": String,
            "field_value": String,
            "field_required": Boolean,
            "field_disabled": Boolean
        }]
    },
    'contribution':{
        "form_id": Number,
        "form_name": String,
        "form_fields": [{
            "field_id": Number,
            "field_title": String,
            "field_type": String,
            "field_value": String,
            "field_required": Boolean,
            "field_disabled": Boolean
        }]
    }
});

mongoose.model('schooladmincontribform', SchoolAdminContribFormSchema);

var contribForm = mongoose.model('schooladmincontribform', SchoolAdminContribFormSchema);

var form = new contribForm(
	{
	  userName: 'dave@smith.com',
	  schoolName: 'FORSYTH ELEMENTARY SCHOOL',
	  state: 'GA',
	  contribution: {
		form_id: '1',
		form_name: "Contribution",
		form_fields: [
		{field_id: 1, field_title: "Computer Lab",
		field_type: "radio", field_value: "$15",
		field_required: true, field_disabled: false},
		{ field_id: 2, field_title: "Teacher gift",
		field_type: "radio", field_value: "$5",
		field_required: true, field_disabled: false},
		{
		field_id: 3, field_title: "Field trip",
		field_type: "radio", field_value: "$18",
		field_required: true, field_disabled: false}]
		},
		membership: {
		form_id: '1',
		form_name: "Membership",
		form_fields: [
		{field_id: 1,
		field_title: "Gold",
		field_type: "radio",
		field_value: "$25",
		field_required: true,
		field_disabled: false},
		{
		field_id: 2,
		field_title: "Silver",
		field_type: "radio",
		field_value: "$15",
		field_required: true,
		field_disabled: false},
		{
		field_id: 3,
		field_title: "Bronze",
		field_type: "radio",
		field_value: "$8",
		field_required: true,
		field_disabled: false}]
		}	
});

form.save(function(err, retForm) {
  if (err) return console.error(err);
  console.dir(retForm);
});  

/* var feadminacct = new feadminaccount({
 firstName: 'David',
 lastName: 'Wible' ,
 userName: 'ddwible@gmail.com'
});

feadminacct.save(function(err, feadminacct) {
  if (err) return console.error(err);
  console.dir(feadminacct);
});  */

/*var feadminacct = new feadminaccount({
 firstName: 'Kent',
 lastName: 'Hamilton' ,
 userName: 'gkh1974@gmail.com'
});

feadminacct.save(function(err, feadminacct) {
  if (err) return console.error(err);
  console.dir(feadminacct);
});   */

