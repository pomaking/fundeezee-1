'use strict';

schoolAdminControllersModule.controller('SchoolAdminRegistrationCtrl', ['$scope', '$http', '$state', 'ptaAcctService', 'contributionBuilderService', function($scope, $http, $state, ptaAcctService, contributionBuilderService) {
    $scope.admin = {};

    $scope.admin.data = [];

    $scope.adminAcct = {};
    $scope.adminAcct.taxExempt = 'no';
    // PTA students data - should be added to $scope.adminAcct
    $scope.additionalAdmin = [];

    var initCostsCallback = function(){
        $scope.adminAcct = ptaAcctService.getCosts();
    }


    //ptaAcctService.findCostsbySchoolName(initCostsCallback, 'JOHNS CREEK ELEMENTARY','GA');

	// getSchools API URL
	var url = 'https://inventory.data.gov/api/action/datastore_search?';
	
	$scope.getSchoolsSearch = function(val) {

    // console.log('school search: ' + val);
    return $http.get(url, {
      params: {
        q: val,
        resource_id: '102fd9bd-4737-401b-b88f-5c5b0fab94ec',
		fields: 'SCHNAM09,LEANM09,MZIP09,LSTATE09'
      }
    }).then(function(response){
		var schools = [];
		for(var i=0;i < response.data.result.records.length;i++){
			schools.push(response.data.result.records[i].SCHNAM09);
            contributionBuilderService.setSchoolZip(response.data.result.records[i].MZIP09);
            contributionBuilderService.setSchoolState(response.data.result.records[i].LSTATE09);
		}

      //return response.data.result.records;
	  return schools;
	  
	  // alert(JSON.stringify(response.data.result.records));
    });
  };



    $scope.deleteItem = function (index) {
        $scope.admin.data.splice(index, 1);
        //console.dir(JSON.stringify($scope.admin.data));
    }
    $scope.addItem = function (index) {
        $scope.admin.data.push({
            nbr: $scope.admin.data.length + 1,
            firstName: $scope.adminFirst,
            lastName: $scope.adminLast,
            userName: $scope.adminUserName
        });
        console.dir(JSON.stringify($scope.admin.data));

        $scope.adminFirst = '';
        $scope.adminLast = '';
        $scope.adminUserName = '';

    }


	$scope.schoolAdminRegistrationSubmit = function (data, schoolAdminRegForm) {
        //var x = data.schoolName.indexOf('(');
        // $scope.adminAcct.schoolState =  data.schoolName.substring(x+1,x+3);
        $scope.adminAcct.schoolName = data.schoolName;
        $scope.adminAcct.username  = 'kate198@smith.com';
        $scope.adminAcct.website = data.website;
        console.log('admin registrationSubmit ' + JSON.stringify($scope.adminAcct) );
        contributionBuilderService.setAdminAcct(setAdminAcctCallback, $scope.adminAcct);
	};

    var setAdminAcctCallback = function(){
        $state.go('schooladminregistration-bank');
    }


    var createAcctCallback = function(){};
    $scope.schoolAdminRegisterBank = function (data, schoolAdminRegForm) {
        contributionBuilderService.addEscrowAcct(createBankAcctCallback, data);

        // add users if create escrow successful
        if($scope.admin.data.length > 0) {

            var state =  contributionBuilderService.getSchoolState();
            var name = $scope.adminAcct.schoolName;
           // create admins....
            for( var i = 0; i<$scope.admin.data.length; i++){
                console.dir( JSON.stringify( $scope.admin.data[i] ) );
                var ptaAcctObj = {};
                ptaAcctObj.firstName = $scope.admin.data[i].firstName;
                ptaAcctObj.lastName = $scope.admin.data[i].lastName;
                ptaAcctObj.userName = $scope.admin.data[i].userName;
                ptaAcctObj.schoolName = state;
                ptaAcctObj.schoolState = name;
                ptaAcctObj.relationshipTitle = 'schoolAdmin';

                var y = {"FEAccount": ptaAcctObj};
                // send create acct form
                ptaAcctService.createAcct(createAcctCallback, y);
            }
        }

    };
	
	var createBankAcctCallback = function (data) {
        $state.go('schooladminmembership');
	};

    $scope.adminAcct = ptaAcctService.getCosts();
}]);