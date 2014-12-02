'use strict';

/* Services */

var ptaServices = angular.module('fundeezee.ptaModule.services', []);

ptaServices.service('ptaAcctService', function($http) {

    var feAccount = {};
    var ptaCosts = {};
    var schoolName = '';
    var schoolState = '';

    $http.defaults.useXDomain = true;

        var createAcct = function (callback, ptaForm) {
			var postData = ptaForm;
            $http({
                method: 'POST',
				url: 'http://localhost:3000/api/ptaregistration',
    			data: postData
				}).
                success(function(data) {
                    feAccount = data;
                    callback(data);
                }).
                error(function(data) {
                    alert('there was an error creating an account');
                });		
				
        };

    var findCostsbySchoolName = function (callback, schoolname, schoolstate) {
        schoolName = schoolname;
        schoolState = schoolstate;
        console.log('school cost lookup for school ' + schoolname);
            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/schooladmincontrib/findbyschool/:'+schoolname+'/:'+schoolState
            }).
                success(function(data) {
                    ptaCosts = data;
                    callback(data);
                    //return ptaCosts;
                }).
            error(function(data) {
                alert('there was an error creating an account');
            });

    };

    var getScopeCosts = function(){
        if (JSON.stringify(ptaCosts) == '{}')
            return;

        var scopeObj = {};
        scopeObj._id = ptaCosts[0]._id;
        scopeObj.userName = ptaCosts[0].username;
        scopeObj.schoolName = ptaCosts[0].schoolName;
        scopeObj.state = ptaCosts[0].state;
        scopeObj.selectedMembership = {};
        scopeObj.selectedContribution = [];

        scopeObj.membership = [];
        scopeObj.contribution = [];

// iterate over each element in the array
        for (var i = 0; i < ptaCosts[0].membership.form_fields.length; i++){
            var x = {
                "field_id" : ptaCosts[0].membership.form_fields[i]._id,
                "field_title" : ptaCosts[0].membership.form_fields[i].field_title,
                "field_type" : ptaCosts[0].membership.form_fields[i].field_type,
                "field_value" : ptaCosts[0].membership.form_fields[i].field_value,
                "field_cost" :  ptaCosts[0].membership.form_fields[i].field_options[0].option_value};
            scopeObj.membership.push(x);
        }

        for (var i = 0; i < ptaCosts[0].contribution.form_fields.length; i++){
            var x = {
                "field_id" : ptaCosts[0].contribution.form_fields[i]._id,
                "field_title" : ptaCosts[0].contribution.form_fields[i].field_title,
                "field_type" : ptaCosts[0].contribution.form_fields[i].field_type,
                "field_value" : ptaCosts[0].contribution.form_fields[i].field_value,
                "field_cost" : ptaCosts[0].contribution.form_fields[i].field_value};

            scopeObj.contribution.push(x);

            var y = ptaCosts[0].contribution.form_fields[i].field_title + ptaCosts[0].contribution.form_fields[i].field_value;
            scopeObj.selectedContribution.push(y);
        }

        console.dir(JSON.stringify(scopeObj));
        return scopeObj;
    }

    var getCosts = function () {
        return ptaCosts;
    }

        return {
            createAcct: createAcct,
            findCostsbySchoolName: findCostsbySchoolName,
            getCosts: getCosts,
            getScopeCosts: getScopeCosts
        };
});



//ptaServices.factory('ptaService', function($http, $q) {
//	var resource_id = '102fd9bd-4737-401b-b88f-5c5b0fab94ec';
//       return {
//         getSchoolsSearch: function(zipCode) {
//           var deferred = $q.defer();
//           var url = "https://inventory.data.gov/api/action/datastore_search?"+"&resource_id="+resource_id+"&q="+zipCode+"&fields=SCHNAM09";
//         $http.get(url).success(function (data, status, headers, config) {
//                deferred.resolve(data);
//            }).error(function (data, status, headers, config) {
//                //this always gets called
//                deferred.reject(status);
//            });
//            return deferred.promise;
//		 }
//     };
//});
	   