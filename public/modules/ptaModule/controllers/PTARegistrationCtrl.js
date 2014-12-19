'use strict';

ptaControllersModule.controller('PTARegistrationCtrl', ['$rootScope', '$scope', '$http', '$state', 'ptaAcctService', function($rootScope,$scope, $http, $state, ptaAcctService) {

    var url = "http://localhost:3000/api/schooladmincontrib/findschool/";
    // .schoolName = '';
    $scope.schoolState = '';
    var ptaAcctObj = {};
/*    $scope.prefix = ['Mr.', 'Mrs.', 'Ms.'];*/
    $scope.ptaAddStudentForm = {};
    $scope.ptaPrimaryAcct = {};
    $scope.partialMultiShow = false;
    $scope.partialIndShow = false;
    $scope.partialChldrenShow = false;
    $scope.showContinue = true;

    $scope.schooldropdown = true;

    $scope.showSchoolLookup = function(){
        console.log('schoolState: ' + $scope.schoolState);
        $scope.schooldropdown = false;
    }

    $scope.getSchoolsSearch = function(schoolname) {
         return  $http({
             method: 'GET',
             url: 'http://localhost:3000/api/schooladmincontrib/findschool/:'+schoolname + '/:' + $scope.schoolState
         }).then(function(response){
             //alert(JSON.stringify(response));
             var schools = [];
             for(var i=0;i < response.data.length;i++){
                 schools.push(response.data[i].schoolName);
             }
             //alert(JSON.stringify( schools) );
             $scope.showContinue = false;
             return schools;
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

    $scope.changePartial = function(){
        console.log('showing partial based on radio selection...' + $scope.ptaMembershipCosts.selectedMembership);
        var multi = "#ptaMultipleMembershipform";
        var ind = "#ptaIndMembershipform";
        var addStudent ="#ptaAddStudentForm";
        var x = $scope.ptaMembershipCosts.selectedMembership;

        if( x == 'individual' || x == 'business'){
            $scope.partialMultiShow = false;
            $scope.partialIndShow = true;
            if(x == 'individual') {
                $scope.partialChldrenShow = true;
            }
            else {
                $scope.partialChldrenShow = false;
            }
        }

        if(x == 'family' || x == 'faculty') {
            $scope.partialMultiShow = true;
            $scope.partialIndShow = false;
            $scope.partialChldrenShow = false;
        }

        if(x.substring(0,1) != 'i' || x.substring(0,1) != 'f' || x.substring(0,1) != 'b' ) {
            $scope.partialMultiShow = true;
        }
    }

    $scope.students = {};
    $scope.students.data = [];

    $scope.deleteItem = function (index) {
        $scope.students.data.splice(index, 1);
        console.dir(JSON.stringify($scope.students.data));
    }
    $scope.addItem = function (index) {
        $scope.students.data.push({
            nbr: $scope.students.data.length + 1,
            studentName: $scope.newItemName
        });
        console.dir(JSON.stringify($scope.students.data));
    }

    $scope.ptaRegistrationSubmit = function (ptaAcctObj, ptaRegForm) {
        ptaAcctService.setSchoolName(ptaAcctObj.schoolName);
        ptaAcctService.setSchoolState($scope.schoolState);

        ptaAcctService.findCostsbySchoolName(findCostsCallback, ptaAcctObj.schoolName, $scope.schoolState);
    };

    var createAcctCallback = function (data) {
        //console.log('saving fe account');
    };

    var findCostsCallback = function (data) {
        $state.go('ptaregistrationCosts', {});
    };

    $scope.ptaMembershipCosts = ptaAcctService.getScopeCosts();
    if($scope.ptaMembershipCosts)
        $scope.changePartial();

    $scope.getMembershipCosts = function(){
        ptaAcctService.getScopeCosts();
    }

    $scope.ptaSelectedCosts = function(ptaAcctObj, ptaSecondaryAcct, ptaMembershipCosts, ptaMembershipForm){
        // ptaMembershipCosts.membership
        console.dir('ptaregistrationCtrl.ptaSelectedCosts method ' + JSON.stringify(ptaMembershipCosts));

        console.dir('ptaregistrationCtrl.ptaSecondaryAcct ' + JSON.stringify(ptaSecondaryAcct));
        var member = [];
        var pta = {};

        pta.schoolName = ptaAcctService.getSchoolName();
        pta.schoolState = ptaAcctService.getSchoolState();
        pta.relationshipTitle = ptaMembershipCosts.selectedMembership;
        pta.orgType = 'pta';
        member.push(pta);

        console.dir('ptaregistrationCtrl.ptaAcctObj ' + JSON.stringify(ptaAcctObj));
        console.dir('ptaregistrationCtrl.memberhsip (pta) ' + JSON.stringify(member));

        $scope.ptaRegistrationJSON = {"FEAccount": ptaAcctObj, "SecondaryAcct" : ptaSecondaryAcct, "Membership": member, "StudentInfo":  $scope.students.data};
        // send create acct form
        ptaAcctService.createAcct(createAcctCallback, $scope.ptaRegistrationJSON);

        ptaAcctService.setReviewChoice(ptaMembershipCosts);

        $state.go('ptaregistrationreviewchoice', {});
    };

    // populate relationship to school
    $scope.schoolRelationship = [
        { label: 'Parent', value: 'parent' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Faculty', value: 'faculty' },
        { label: 'School Admin', value: 'schoolAdmin' }
    ];

    $scope.schoolRelationshipSelected = $scope.schoolRelationship[1];

}]);