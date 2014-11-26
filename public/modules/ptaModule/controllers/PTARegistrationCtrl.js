'use strict';

ptaControllersModule.controller('PTARegistrationCtrl', ['$rootScope', '$scope', '$http', '$state', 'ptaAcctService', function($rootScope,$scope, $http, $state, ptaAcctService) {
	// getSchools API URL
	var url = "https://inventory.data.gov/api/action/datastore_search?";
	
	$scope.getSchoolsSearch = function(val) {
    return $http.get(url, {
      params: {
        q: val,
        resource_id: '102fd9bd-4737-401b-b88f-5c5b0fab94ec',
		fields: 'SCHNAM09,LEANM09,MZIP09,LSTATE09'
      }
    }).then(function(response){
		var schools = []
		for(var i=0;i < response.data.result.records.length;i++){
			schools.push(response.data.result.records[i].SCHNAM09+' ('+response.data.result.records[i].LSTATE09+')');
		}

      //return response.data.result.records;
	  return schools;
	  
	  // alert(JSON.stringify(response.data.result.records));
    });
  };
	
	
	// PTA Registration JSON obj
	$scope.ptaRegistrationJSON = [];

    // PTA Membership costs JSON obj
    var ptaMembershipCosts = {};
    $scope.ptaMembershipCosts = {};
	
	// PTA students data - should be added to $scope.ptaRegistrationJSON
	$scope.populatedPtaStudents = [];
	// main JSON data JSON obj to send in PTA ajax submission
	
  	// add child
    $scope.ptaAddStudent = function (ptaStudents, ptaAddStudentForm) {

            $scope.populatedPtaStudents.push(ptaStudents);
			
			console.dir(JSON.stringify($scope.populatedPtaStudents));
			
            // clear array so that we can add more from bound scope object
            // $scope.ptaStudents = '';

            // $scope.ptaAddStudentForm.$setPristine();
    };
	
	$scope.ptaRegistrationSubmit = function (ptaAcctObj, ptaRegForm) {
        var x = ptaAcctObj.schoolName.indexOf('(');
        ptaAcctObj.schoolState =  ptaAcctObj.schoolName.substring(x+1,x+3);
        ptaAcctObj.schoolName = ptaAcctObj.schoolName.substring(0, x).trim();

        $state.go('ptaregistrationCosts', {}, {reload: true});

        $scope.ptaMembershipCosts = ptaAcctService.findCostsbySchoolName(findCostsCallback, ptaAcctObj.schoolName, ptaAcctObj.schoolState);

        $scope.ptaRegistrationJSON = {'FEAccount': ptaAcctObj, 'StudentInfo': $scope.populatedPtaStudents};

        console.dir('ptaAcct:'  + JSON.stringify(ptaAcctObj));

		// send create acct form
	    ptaAcctService.createAcct(createAcctCallback, $scope.ptaRegistrationJSON);

        console.dir( 'ptaRegistrationSubmit.getCosts '  + JSON.stringify($scope.ptaMembershipCosts));
	};
	
	var createAcctCallback = function (data) {
        console.dir('saving fe account');
	};

    var findCostsCallback = function (data) {
        $rootScope.ptaMembershipCosts = data;
        console.dir('findCosts js callback schoolName: ' + data[0].schoolName);
        ptaMembershipCosts = data;
        console.dir('findCosts callback: ' + JSON.stringify(data));

        //console.dir('found school membership form data for ' + data.schoolme);

    };

    $scope.getMembershipCosts = function(){
        var x = ptaAcctService.getCosts();
        console.dir('costs data: ' + x);
        $scope.ptaMembershipCosts = JSON.stringify(x);
    }

    // populate relationship to school
    $scope.schoolRelationship = [
        { label: 'Parent', value: 'parent' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Faculty', value: 'faculty' },
        { label: 'School Admin', value: 'schoolAdmin' }
    ];

    $scope.schoolRelationshipSelected = $scope.schoolRelationship[1];

}]);