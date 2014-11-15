'use strict';

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

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = [
        'ui.router',
        'ui.bootstrap','ngResource', 'ngAnimate', 'ui.utils',
        'fundeezee.mainModule',
        'fundeezee.ptaModule',
        'fundeezee.supplierModule',
        'ngResource', 'ngAnimate',
        'ui.utils'
    ]

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
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
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('feApp');
'use strict';


// Setting up route
angular.module('feApp').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
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
	}
]);

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);