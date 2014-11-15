'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);

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

    angular.module('fundeezee.supplierModule', [
        'fundeezee.supplierModule.services',
        'fundeezee.supplierModule.controllers'
    ]);

    angular.module('fundeezeeApp', [
        'ui.router',
        'ui.bootstrap',
        'fundeezee.mainModule',
        'fundeezee.ptaModule',
        'fundeezee.supplierModule'

    ]).config(['$stateProvider', '$httpProvider', function($stateProvider, $httpProvider) {

        $stateProvider
            .state('/', {
                url: "",
                views: {
                    "leftnav": {
                        templateUrl: "/fe/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/fe/partials/main/home.html",
                        controller: "HomeCtrl"
                    }
                }
            })
            .state('supplies', {
                url: "/supplies",
                views: {
                    "leftnav": {
                        templateUrl: "/fe/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/fe/partials/supplier/buysupplies.html",
                        controller: "BuySuppliesCtrl"
                    }
                }
            })
            .state('ptaregistration', {
                url: "/PTA-Registration",
                views: {
                    "leftnav": {
                        templateUrl: "/fe/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/fe/partials/pta/pta-registration.html",
                        controller: "PTARegistrationCtrl"
                    }
                }
            })
    }]);
});