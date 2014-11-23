'use strict';

schoolAdminControllersModule.controller('ContributionBuilderCtrl', ['$scope', '$dialogs', '$state', 'contributionBuilderService', function($scope, $dialogs, $state, contributionBuilderService) {
    // preview form mode
    $scope.previewMode = false;

    // new form
    $scope.form = {};
    $scope.form.form_id = 1;
    $scope.form.form_name = 'Membership';
    $scope.form.form_fields = [];
    $scope.schooldAdminMembershipObj = {};

    // previewForm - for preview purposes, form will be copied into this
    // otherwise, actual form might get manipulated in preview mode
    $scope.previewForm = {};

    // add new field drop-down:
    $scope.addField = {};
    $scope.addField.types = contributionBuilderService.fields;
    $scope.addField.new = $scope.addField.types[0].name;
    $scope.addField.lastAddedID = 0;

    // accordion settings
    $scope.accordion = {}
    $scope.accordion.oneAtATime = true;

    // create new field button click
    $scope.addNewField = function(){

        // incr field_id counter
        $scope.addField.lastAddedID++;

        var newField = {
            "field_id" : $scope.addField.lastAddedID,
            "field_title" : "PTA Membership" ,
            "field_type" : $scope.addField.new,
            "field_value" : "membership",
            "field_required" : true,
            "field_disabled" : false
        };

        // put newField into fields array
        $scope.form.form_fields.push(newField);
        $scope.addOption(newField);
    }

    // deletes particular field on button click
    $scope.deleteField = function (field_id){
        for(var i = 0; i < $scope.form.form_fields.length; i++){
            if($scope.form.form_fields[i].field_id == field_id){
                $scope.form.form_fields.splice(i, 1);
                break;
            }
        }
    }

    // add new option to the field
    $scope.addOption = function (field){
        var lastOptionID = 0;
        // new option's id
        var option_id = lastOptionID + 1;

        var newOption = {
            "option_id" : option_id,
            "option_title" : "PTA Membership",
            "option_value" : "0"
        };

        field.field_options = new Array();
        field.field_options.push(newOption);

        if(field.field_options[field.field_options.length-1])
            lastOptionID = field.field_options[field.field_options.length-1].option_id;


    }


    // delete particular option
    $scope.deleteOption = function (field, option){
        for(var i = 0; i < field.field_options.length; i++){
            if(field.field_options[i].option_id == option.option_id){
                field.field_options.splice(i, 1);
                break;
            }
        }
    }


    // preview form
    $scope.previewOn = function(){
        if($scope.form.form_fields == null || $scope.form.form_fields.length == 0) {
            var title = 'Error';
            var msg = 'No fields added yet, please add fields to the form before preview.';

            // need to figure out how to actually show this dialog... not worky
            var dlg = $dialogs.notify(title,msg);
        }
        else {
            $scope.previewMode = !$scope.previewMode;
            $scope.form.submitted = false;
            angular.copy($scope.form, $scope.previewForm);
        }
    }

    // hide preview form, go back to create mode
    $scope.previewOff = function(){
        $scope.previewMode = !$scope.previewMode;
        $scope.form.submitted = false;
    }

    // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (field){
        if(field.field_type == "radio" || field.field_type == "dropdown")
            return true;
        else
            return false;
    }

    $scope.schoolAdminContribSubmit = function (schoolAdminContribObj, schoolAdminRegForm) {
        var schoolAdminCreateFormJSON = {'userName':'kate100@smith.com', 'schoolName':'SHELBY ELEMENTARY SCHOOL', 'state':'GA',  'membership': contributionBuilderService.schooldAdminMembershipObj, 'contribution': schoolAdminContribObj};
        console.dir(JSON.stringify(schoolAdminCreateFormJSON));

        // send create acct form
        contributionBuilderService.createContribForm(schoolAdminContribCreateCallback, schoolAdminCreateFormJSON);
    }

    $scope.schoolAdminContribCreate = function (schoolAdminMembershipObj, schoolAdminRegForm) {

        contributionBuilderService.schooldAdminMembershipObj = schoolAdminMembershipObj;
        console.dir(JSON.stringify(contributionBuilderService.schooldAdminMembershipObj));

        // send create acct form
        $state.go('schooladmincontribution', {}, {reload: true});
    }

    $scope.schoolAdminMembershipSubmit = function (schoolAdminMembershipObj, schoolAdminRegForm) {
        var schoolAdminCreateFormJSON = {'userName':'kate199@smith.com', 'schoolName':'SHELBY ELEMENTARY SCHOOL', 'state':'GA',  'membership': schoolAdminMembershipObj};
        console.dir(JSON.stringify(schoolAdminCreateFormJSON));

        // send create acct form
        contributionBuilderService.createContribForm(schoolAdminContribCreateCallback, schoolAdminCreateFormJSON);
    }

    var schoolAdminContribCreateCallback = function(data){
        console.dir(data);
    }

    // deletes all the fields
    $scope.reset = function (){
        $scope.form.form_fields.splice(0, $scope.form.form_fields.length);
        $scope.addField.lastAddedID = 0;
    }
}]);