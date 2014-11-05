'use strict';


// Declare app level module which depends on filters, and services
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
        $httpProvider.defaults.useXDomain = true;
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
            .state('ptacontributions', {
                url: "/PTA-Contributions",
                views: {
                    "leftnav": {
                        templateUrl: "/fe/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/fe/partials/pta/pta-contributions.html",
                        controller: "PTARegistrationCtrl"
                    }
                }
            })
    }]);