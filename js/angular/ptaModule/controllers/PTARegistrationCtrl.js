'use strict';

ptaControllersModule.controller('PTARegistrationCtrl', ['$scope', '$http', 'ptaService', 'ptaAcctService', function($scope, $http, ptaService, ptaAcctService) {
	// getSchools API URL
	var url = "https://inventory.data.gov/api/action/datastore_search?";
	
	$scope.getSchoolsSearch = function(val) {
    return $http.get(url, {
      params: {
        q: val,
        resource_id: '102fd9bd-4737-401b-b88f-5c5b0fab94ec',
		fields: 'SCHNAM09,LEANM09,MZIP09'
      }
    }).then(function(response){
		var schools = []
		for(var i=0;i < response.data.result.records.length;i++){
			schools.push(response.data.result.records[i].SCHNAM09+' ('+response.data.result.records[i].MZIP09+')');
		}

      //return response.data.result.records;
	  return schools;
	  
	  // alert(JSON.stringify(response.data.result.records));
    });
  };
	
	
	// PTA Registration JSON obj
	$scope.ptaRegistrationJSON = [];
	
	// PTA students data - should be added to $scope.ptaRegistrationJSON
	$scope.populatedPtaStudents = [];
	
	// main JSON data JSON obj to send in PTA ajax submission
	
  	// add child
    $scope.ptaAddStudent = function (ptaStudents, ptaAddStudentForm) {

            $scope.populatedPtaStudents.push(ptaStudents);
			
			alert(JSON.stringify($scope.populatedPtaStudents));
			
            // clear array so that we can add more from bound scope object
            // $scope.ptaStudents = '';

            // $scope.ptaAddStudentForm.$setPristine();
    };
	
	$scope.ptaRegistrationSubmit = function (ptaAcctObj, ptaRegForm) {
		$scope.ptaRegistrationJSON = {'PTARegForm': ptaAcctObj, 'StudentInfo': $scope.populatedPtaStudents};
		// send create acct form
	ptaAcctService.createAcct(createAcctCallback, $scope.ptaRegistrationJSON);
	};
	
	var createAcctCallback = function (data) {
		alert(data.id+" "+data.content);
	}
	
	
}]);