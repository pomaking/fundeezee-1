'use strict';

/* Directives */

var fundeezeeDirectives = angular.module('fundeezee.directives', []);

fundeezeeDirectives.directive('fieldDirective', function ($http, $compile) {
    var getTemplateUrl = function(field) {
        var type = field.field_type;
        var templateUrl = '';

        switch(type) {
            case 'textfield':
                templateUrl = '../fe/partials/directive-templates/textfield.html';
                break;
            case 'email':
                templateUrl = '../fe/partials/directive-templates/email.html';
                break;
            case 'textarea':
                templateUrl = '../fe/partials/directive-templates/textarea.html';
                break;
            case 'checkbox':
                templateUrl = '../fe/partials/directive-templates/checkbox.html';
                break;
            case 'date':
                templateUrl = '../fe/partials/directive-templates/date.html';
                break;
            case 'dropdown':
                templateUrl = '../fe/partials/directive-templates/dropdown.html';
                break;
            case 'hidden':
                templateUrl = '../fe/partials/directive-templates/hidden.html';
                break;
            case 'password':
                templateUrl = '../fe/partials/directive-templates/password.html';
                break;
            case 'radio':
                templateUrl = '../fe/partials/directive-templates/radio.html';
                break;
        }
        return templateUrl;
    }

    var linker = function(scope, element) {
        // GET template content from path
        var templateUrl = getTemplateUrl(scope.field);
        $http.get(templateUrl).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    }

    return {
        template: '<div>{{field}}</div>',
        restrict: 'E',
        scope: {
            field:'='
        },
        link: linker
    };
});
fundeezeeDirectives.directive('formDirective', function () {
    return {

        controller: function($scope){
            $scope.submit = function(){
                alert('Form submitted..');
                $scope.form.submitted = true;
            }
            $scope.cancel = function(){
                alert('Form canceled..');
            }
        },
        templateUrl: '../fe/partials/directive-templates/form/form.html',
        restrict: 'E',
        scope: {
            form:'='
        }
    };
});