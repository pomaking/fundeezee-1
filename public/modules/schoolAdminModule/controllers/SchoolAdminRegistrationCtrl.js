'use strict';

schoolAdminControllersModule.controller('SchoolAdminRegistrationCtrl', ['$scope', '$http', 'ptaAcctService', function($scope, $http, ptaAcctService) {
	// getSchools API URL
	var url = 'https://inventory.data.gov/api/action/datastore_search?';
	
	$scope.getSchoolsSearch = function(val) {
    return $http.get(url, {
      params: {
        q: val,
        resource_id: '102fd9bd-4737-401b-b88f-5c5b0fab94ec',
		fields: 'SCHNAM09,LEANM09,MZIP09'
      }
    }).then(function(response){
		var schools = [];
		for(var i=0;i < response.data.result.records.length;i++){
			schools.push(response.data.result.records[i].SCHNAM09+' ('+response.data.result.records[i].MZIP09+')');
		}

      //return response.data.result.records;
	  return schools;
	  
	  // alert(JSON.stringify(response.data.result.records));
    });
  };
	
	$scope.schoolAdminRegistrationSubmit = function (ptaDataObj, schoolAdminRegForm) {
        ptaDataObj.relationshipTitle = 'schoolAdmin';
		$scope.ptaRegistrationJSON = {'FEAccount': ptaDataObj};
		// send create acct form
	    ptaAcctService.createAcct(createAcctCallback, $scope.ptaRegistrationJSON);
	};
	
	var createAcctCallback = function (data) {
		alert(data.FEAccount.id);
	};
	
	
}]);