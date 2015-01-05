'use strict';

/* Services */

var ptaServices = angular.module('fundeezee.ptaModule.services', []);

ptaServices.service('ptaAcctService', function($http) {

    // the persisted fe Acct
    var feAccount = {};
    // the persisted payment info
    var ptaPayment = {};
    // raw costs
    var ptaCosts = {};
    // selected costs
    var selectedPTACosts = {};
    var schoolName = '';
    var schoolState = '';
    // flattened costs(that you see on when the checkout button is shown)
    var reviewChoice = {};
    var choice = {};

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
        //console.log('school cost lookup for school ' + schoolname);
            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/schooladmincontrib/findbyschool/:'+schoolname+'/:'+schoolstate
            }).
                success(function(data) {
                    ptaCosts = data;
                    callback(data);
                    //return ptaCosts;
                }).
            error(function(data) {
                alert('It is possible that your school has not created the membership costs yet.  Please contact your local pta.');
            });

    };

    var findSchoolLookup = function (callback, schoolname, schoolstate) {
        schoolName = schoolname;
        schoolState = schoolstate;
        //console.log('school lookup for school ' + schoolname);
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/schooladmincontrib/findschool/:'+schoolname+'/:'+schoolstate
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
        // console.log(ptaCosts);
        if (JSON.stringify(ptaCosts) == '{}')
            return
        if (JSON.stringify(ptaCosts) == '[]')
            return;

        var scopeObj = {};
        scopeObj._id = ptaCosts[0]._id;
        scopeObj.userName = ptaCosts[0].username;
        scopeObj.schoolName = ptaCosts[0].schoolName;
        scopeObj.state = ptaCosts[0].state;
        scopeObj.selectedMembership = {};
        scopeObj.selectedContribution = [];
        scopeObj.selectedTextContribution = [];
        scopeObj.taxExempt = ptaCosts[0].taxExempt;
        scopeObj.ptaName =  ptaCosts[0].ptaName;
        scopeObj.membershipTerm = ptaCosts[0].membershipTerm;
        var checked = false;


        if(ptaCosts[0].individual) {
            scopeObj.individual = ptaCosts[0].individual;
            scopeObj.individualCost = ptaCosts[0].individualCost;
            scopeObj.selectedMembership = "individual";
            checked = true;
        }

        if(ptaCosts[0].family) {
            scopeObj.family = ptaCosts[0].family;
            scopeObj.familyCost = ptaCosts[0].familyCost;
            if(!checked){
                scopeObj.ptaMembershipCosts.selectedMembership = "family";
                checked = false;
            } else
                scopeObj.familySelected = false;
        }

        if(ptaCosts[0].faculty) {
            scopeObj.faculty = ptaCosts[0].faculty;
            scopeObj.facultyCost = ptaCosts[0].facultyCost;
            if(!checked) {
                scopeObj.ptaMembershipCosts.selectedMembership = "faculty";
                checked = false;
            } else {
                scopeObj.facultySelected = false;
            }
        }

        if(ptaCosts[0].business) {
            scopeObj.business = ptaCosts[0].business;
            scopeObj.businessCost = ptaCosts[0].businessCost;
            if (!checked) {
                scopeObj.ptaMembershipCosts.selectedMembership = "business";
                checked = false;
            } else {
                scopeObj.businessSelected = false;
            }
        }

        if(ptaCosts[0].membership.form_fields.length > 0){
            scopeObj.membership = [];
            for (var i = 0; i < ptaCosts[0].membership.form_fields.length; i++){
                var x = {
                    "field_id" : ptaCosts[0].membership.form_fields[i]._id,
                    "field_title" : ptaCosts[0].membership.form_fields[i].field_title,
                    "field_type" : ptaCosts[0].membership.form_fields[i].field_type,
                    "field_value" : ptaCosts[0].membership.form_fields[i].field_value,
                    "field_cost" :  ptaCosts[0].membership.form_fields[i].field_options[0].option_value,
                    "field_selected" : false};

                if(!checked){
                        checked = true;
                    }

                scopeObj.membership.push(x);
            }
        }

        if(ptaCosts[0].contribution.form_fields.length > 0 ) {
            scopeObj.contribution = [];
            scopeObj.textContribution = [];

            for (var i = 0; i < ptaCosts[0].contribution.form_fields.length; i++){
                var x = {
                    "field_id" : ptaCosts[0].contribution.form_fields[i]._id,
                    "field_title" : ptaCosts[0].contribution.form_fields[i].field_title,
                    "field_type" : ptaCosts[0].contribution.form_fields[i].field_type,
                    "field_value" : ptaCosts[0].contribution.form_fields[i].field_value,
                    "field_cost" : ptaCosts[0].contribution.form_fields[i].field_value};

                if(ptaCosts[0].contribution.form_fields[i].field_type == 'checkbox')
                    scopeObj.contribution.push(x);
                else
                    scopeObj.textContribution.push(x);
                //var y = ptaCosts[0].contribution.form_fields[i].field_title + ptaCosts[0].contribution.form_fields[i].field_value;
                //scopeObj.selectedContribution.push(y);
            }
        }

        //console.dir(JSON.stringify(scopeObj));
        selectedPTACosts = scopeObj;
        return scopeObj;
    }

    var getCosts = function () {
        // console.log('getCosts: ' + JSON.stringify(ptaCosts));
        if(ptaCosts[0])
            ptaCosts[0].schoolName = ptaCosts[0].schoolName + ' (' + ptaCosts[0].schoolState + ')';
        return ptaCosts[0];
    }

    var getSelectedPTACosts = function(){
        return selectedPTACosts;
    }

    var getReviewChoice = function(){
        //console.log('getReviewChoice ' + JSON.stringify(reviewChoice));
        return reviewChoice;
    }

    var setChoice = function(data){
        choice = data;
    }

    var getChoice = function(){
        //console.log('getChoice ' + JSON.stringify(choice));
        return choice;
    }

    var setReviewChoice = function(data){
        reviewChoice = data;
    }

    var getFEAccount = function(){
        //console.log('getFEAccount ' + JSON.stringify(feAccount));
        return feAccount;
    }

    var setSchoolName = function(data){
        schoolName = data;
    }

    var getSchoolName = function(){
        //console.log('schoolName: ' + schoolName);
        return schoolName;
    }

    var setSchoolState = function(data){
        schoolState = data;
    }

    var getSchoolState = function(){
        //console.log('schoolstate: ' + schoolState);
        return schoolState;
    }

    var getPTAPayment = function(){
        return ptaPayment;
    }

    // need to assemble the balalnced payment adn persist to the db
    var checkout = function(ptaPayment) {
        //
        console.log( "pta checout service: " + JSON.stringify(ptaPayment));
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/ptapayment',
            data: ptaPayment
        }).
            success(function(data) {
                ptaPayment = data;
                //callback(data);
            }).
            error(function(data) {
                alert('there was an error creating an account');
            });



    }

    return {
        createAcct: createAcct,
        findCostsbySchoolName: findCostsbySchoolName,
        getCosts: getCosts,
        getScopeCosts: getScopeCosts,
        getSelectedPTACosts: getSelectedPTACosts,
        getReviewChoice: getReviewChoice,
        setReviewChoice: setReviewChoice,
        getChoice: getChoice,
        setChoice: setChoice,
        getFEAccount: getFEAccount,
        checkout : checkout,
        setSchoolName: setSchoolName,
        getSchoolName: getSchoolName,
        setSchoolState : setSchoolState,
        getSchoolState : getSchoolState,
        getPTAPayment : getPTAPayment
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
	   