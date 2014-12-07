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

angular.module('fundeezee.schoolAdminModule', [
    'fundeezee.schoolAdminModule.services',
    'fundeezee.schoolAdminModule.controllers'
]);

angular.module('fundeezeeApp', [
    'ui.router',
	'ui.bootstrap',
        'ngAnimate',
        'dialogs',
	'fundeezee.mainModule',
    'fundeezee.ptaModule',
    'fundeezee.schoolAdminModule',
    'fundeezee.directives'
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
            .state('schooladminregistration', {
                // school admin registration form start... the form a person fills out to be an admin for a school
                url: "/schooladminregistration",
                views: {
                    "leftnav": {
                        templateUrl: "./partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "partials/schooladmin/schooladmin-registration.html",
                        controller: "SchoolAdminRegistrationCtrl"
                    }
                }
            })
            .state('schooladminregistration-bank', {
                // school admin registration form bank account (pg2)
                url: "/schooladminregistration-bank",
                views: {
                    "leftnav": {
                        templateUrl: "./partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "partials/schooladmin/schooladmin-registerbank.html",
                        controller: "SchoolAdminRegistrationCtrl"
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
            .state('ptaregistrationreviewchoice', {
                url: "/pta-registration-reviewchoice",
                views: {
                    "leftnav": {
                        templateUrl: "/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/partials/pta/pta-membership-reviewchoice.html",
                        controller: "PTAMembershipPayCtrl"
                    }
                }
            })
            .state('ptaregistrationPayment', {
                url: "/pta-registration-payment",
                views: {
                    "leftnav": {
                        templateUrl: "/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/partials/pta/pta-membership-payment.html",
                        controller: "PTAMembershipPayCtrl"
                    }
                }
            })
            .state('schooladmincontribution', {
                // the dynamic form to add/remove **contribution** types
                url: "/schooladmincontribution-create",
                views: {
                    "leftnav": {
                        templateUrl: "./partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "partials/schooladmin/schooladmin-contributionbuilder.html",
                        controller: "ContributionBuilderCtrl"
                    }
                }

            })
            .state('schooladminmembership', {
                // the dynamic form to add/remove membership types
                url: "/schooladminmembership-create",
                views: {
                    "leftnav": {
                        templateUrl: "/partials/main/leftnav.html"
                    },
                    "maincontent": {
                        templateUrl: "/partials/schooladmin/schooladmin-membershipbuilder.html",
                        controller: "ContributionBuilderCtrl"
                    }
                }
            })
    }]);