'use strict';

ptaControllersModule.controller('PTARegistrationCtrl', ['$rootScope', '$scope', '$http', '$state', 'ptaAcctService', function($rootScope,$scope, $http, $state, ptaAcctService) {
    // getSchools API URL
    var url = "https://inventory.data.gov/api/action/datastore_search?";
    var schoolName = '';
    var schoolState = '';
    var ptaAcctObj = {};
/*    $scope.prefix = ['Mr.', 'Mrs.', 'Ms.'];*/
    $scope.ptaAddStudentForm = {};
    $scope.ptaPrimaryAcct = {};
    $scope.partialMultiShow = false;
    $scope.partialIndShow = false;
    $scope.partialChldrenShow = false;

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
            studentName: $scope.newItemName,
            gradeLevel: $scope.newItemGrade
        });
        console.dir(JSON.stringify($scope.students.data));
    }

    $scope.ptaRegistrationSubmit = function (ptaAcctObj, ptaRegForm) {
        var x = ptaAcctObj.schoolName.indexOf('(');
        var state = ptaAcctObj.schoolName.substring(x+1,x+3);
        var name = ptaAcctObj.schoolName.substring(0, x).trim();
        ptaAcctService.setSchoolName(name);
        ptaAcctService.setSchoolState(state);

        ptaAcctService.findCostsbySchoolName(findCostsCallback, name, state);
    };

    var createAcctCallback = function (data) {
        //console.log('saving fe account');
    };

    var findCostsCallback = function (data) {
        $state.go('ptaregistrationCosts', {});
    };

    $scope.ptaMembershipCosts = ptaAcctService.getScopeCosts();

    $scope.getMembershipCosts = function(){
        ptaAcctService.getScopeCosts();
    }

    $scope.ptaSelectedCosts = function(ptaAcctObj, ptaSecondaryAcct, ptaMembershipCosts, ptaMembershipForm){
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

        $scope.ptaRegistrationJSON = {"FEAccount": ptaAcctObj, "SecondaryAcct" : ptaSecondaryAcct, "Membership": member,  "StudentInfo":  $scope.students.data};
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