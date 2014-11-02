'use strict';

/* Services */

var ptaServices = angular.module('fundeezee.ptaModule.services', []);

ptaServices.factory('ptaAcctService', function($http) {
    return {
        createAcct: function (callback, ptaForm) {
			var postData = ptaForm;
            $http({
                method: 'POST',
				url: '//localhost:8999/createFundeezeeAccount/add',
    			data: postData
				}).
                success(function(data) {
                    callback(data);
                }).
                error(function(data) {
                    alert('there was an error creating an account');
                });		
				
        }
};
});

ptaServices.factory('ptaService', function($http, $q) {
	var resource_id = '102fd9bd-4737-401b-b88f-5c5b0fab94ec';
       return {
         getSchools: function(zipCode) {
           var deferred = $q.defer();
           var url = "https://inventory.data.gov/api/action/datastore_search?"+"&resource_id="+resource_id+"&q="+zipCode+"&fields=SCHNAM09";
         $http.get(url).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                //this always gets called
                deferred.reject(status);
            });
            return deferred.promise;
		 }
     };
});
	   