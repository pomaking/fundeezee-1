'use strict';

schoolAdminControllersModule.controller('SchoolAdminRegistrationCtrl', ['$scope', '$http', '$state', 'ptaAcctService', 'contributionBuilderService', function($scope, $http, $state, ptaAcctService, contributionBuilderService) {

    $scope.adminAcct = {};
    // PTA students data - should be added to $scope.adminAcct
    $scope.additionalAdmin = [];

	// getSchools API URL
	var url = 'https://inventory.data.gov/api/action/datastore_search?';
	
	$scope.getSchoolsSearch = function(val) {
    return $http.get(url, {
      params: {
        q: val,
        resource_id: '102fd9bd-4737-401b-b88f-5c5b0fab94ec',
		fields: 'SCHNAM09,LEANM09,MZIP09,LSTATE09'
      }
    }).then(function(response){
		var schools = [];
		for(var i=0;i < response.data.result.records.length;i++){
			schools.push(response.data.result.records[i].SCHNAM09+' ('+response.data.result.records[i].LSTATE09+')');
		}

      //return response.data.result.records;
	  return schools;
	  
	  // alert(JSON.stringify(response.data.result.records));
    });
  };

    // add child
    $scope.addAdmin = function (adminAcct, schoolAdminBankForm) {

        $scope.additionalAdmin.push(adminAcct);

        console.dir(JSON.stringify($scope.populatedPtaStudents));
    };

	$scope.schoolAdminRegistrationSubmit = function (data, schoolAdminRegForm) {
        var x = data.schoolName.indexOf('(');
        $scope.adminAcct.schoolState =  data.schoolName.substring(x+1,x+3);
        $scope.adminAcct.schoolName = data.schoolName.substring(0, x).trim();

        $scope.adminAcct.relationshipTitle = 'schoolAdmin';

		console.dir( JSON.stringify($scope.adminAcct) );
        $state.go('schooladminregistration-bank');
	};

    $scope.schoolAdminRegisterBank = function (data, schoolAdminRegForm) {
        console.dir( JSON.stringify(data) );
        $scope.adminAcct = data;
        $scope.adminAcct.additionalAdmin = [];
        $scope.adminAcct.additionalAdmin.push($scope.additionalAdmin);
        console.dir( JSON.stringify($scope.adminAcct) );
        contributionBuilderService.adminAcct(createBankAcctCallback, $scope.adminAcct);

    };
	
	var createBankAcctCallback = function (data) {
        $state.go('schooladminmembership');
	};
	
	
}]);