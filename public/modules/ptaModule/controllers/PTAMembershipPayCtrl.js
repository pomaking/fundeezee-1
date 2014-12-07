'use strict';

ptaControllersModule.controller('PTAMembershipPayCtrl', ['$scope', '$http', '$state', 'ptaAcctService', function($scope, $http, $state, ptaAcctService) {
    $scope.reviewChoice = {};

    var ptaPaymentSubmit = function (ptaMembershipSelectedCosts, ptaPaymentForm) {

    };



    $scope.reviewChoice = ptaAcctService.getReviewChoice();

}]);