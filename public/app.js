'use strict';

//Start by defining the main module and adding the module dependencies
//angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
/*angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
 function($locationProvider) {
 $locationProvider.hashPrefix('!');
 }
 ]);*/

// Declare app level module which depends on filters, and services
// var app = angular.module('feApp', []);

angular.module('fundeezee.mainModule', [
    'fundeezee.mainModule.services',
    'fundeezee.mainModule.controllers'
]);

angular.module('fundeezee.ptaModule', [
    'fundeezee.ptaModule.services',
    'fundeezee.ptaModule.controllers'
]);
/*
angular.module('fundeezee.supplierModule', [
    'fundeezee.supplierModule.services',
    'fundeezee.supplierModule.controllers'
]);*/

angular.module('fundeezeeApp', [
    'ui.router',
	'ui.bootstrap',
	'fundeezee.mainModule',
    'fundeezee.ptaModule'
    //'fundeezee.supplierModule'

]).config(['$stateProvider', '$httpProvider', '$locationProvider', function($stateProvider, $httpProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');

        $stateProvider
            .state('/', {
                url: "",
                views: {
                    "leftnav": {
                        templateUrl: "/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/partials/main/home.html",
                        controller: "HomeCtrl"
                    }
                }
            })
			.state('supplies', {
                url: "/supplies",
                views: {
                    "leftnav": {
                        templateUrl: "/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/partials/supplier/buysupplies.html",
                        controller: "BuySuppliesCtrl"
                    }
                }
            })
			.state('ptaregistration', {
                url: "/pta-registration",
                views: {
                    "leftnav": {
                        templateUrl: "/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/partials/pta/pta-registration.html",
                        controller: "PTARegistrationCtrl"
                    }
                }
            })
            .state('ptaregistrationCosts', {
                url: "/pta-registration-costs",
                views: {
                    "leftnav": {
                        templateUrl: "/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/partials/pta/pta-membership-costs.html",
                        controller: "PTARegistrationCtrl"
                    }
                }
            })
    }]);