'use strict';

/* Services */

var ptaAdminServices = angular.module('fundeezee.schoolAdminModule.services', []);

ptaAdminServices.service('contributionBuilderService', function($http) {

    var formsJsonPath = './data/sample_forms.json';

    return {
        fields:[
            {
                name : 'textfield',
                value : 'Textfield'
            },
           /* {
                name : 'email',
                value : 'E-mail'
            },
            {
                name : 'password',
                value : 'Password'
            },*/
            {
                name : 'radio',
                value : 'Radio Buttons'
            },
            /*{
                name : 'dropdown',
                value : 'Dropdown List'
            },
            {
                name : 'date',
                value : 'Date'
            },
            {
                name : 'textarea',
                value : 'Text Area'
            },*/
            {
                name : 'checkbox',
                value : 'Checkbox'
            }
/*            {
                name : 'hidden',
                value : 'Hidden'
            }*/
        ],
        form:function (id) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get(formsJsonPath).then(function (response) {
                var requestedForm = {};
                angular.forEach(response.data, function (form) {
                    if (form.form_id == id) requestedForm = form;
                });
                return requestedForm;
            });
        },
        forms: function() {
            return $http.get(formsJsonPath).then(function (response) {
                return response.data;
            });
        },
        createContribForm: function(callback, schoolAdminDataObj) {
            var postData = schoolAdminDataObj;
            $http({
                method: 'POST',
                url: 'http://localhost:3000/api/schooladmincontrib/',
                data: postData
            }).
            success(function (data) {
                callback(data);
            }).
            error(function (data) {
                alert('there was an error creating an account');
            });
        }

    };

});