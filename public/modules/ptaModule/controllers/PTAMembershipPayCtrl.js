'use strict';

ptaControllersModule.controller('PTAMembershipPayCtrl', ['$scope', '$http', '$state', 'ptaAcctService', function($scope, $http, $state, ptaAcctService) {
    $scope.reviewChoice = {};
    $scope.feUser = {};


    var ptaPaymentSubmit = function (ptaMembershipSelectedCosts, ptaPaymentForm) {

    };

    var assembleReview = function(){
        var review = {};
        var x = ptaAcctService.getReviewChoice();
        var membership = x.selectedMembership;
        review.schoolName = x.schoolName;
        review.ptaName = x.ptaName;
        if(membership == 'individual'){
            review.display = 'Individual';
            review.mCost  = x.individualCost;
            review.tCost = x.individualCost + 1;
        }
        if(membership == 'family'){
            review.display = 'Family';
            review.mCost  = x.familyCost;
            review.tCost = x.familyCost + 1;
        }
        if(membership == 'faculty'){
            review.display = 'Faculty';
            review.mCost  = x.facultyCost;
            review.tCost = x.facultyCost + 1;
        }
        if(membership == 'business'){
            review.display = 'Business';
            review.mCost  = x.businessCost;
            review.tCost = x.businessCost + 1;
        }
        return review;

    }

    $scope.reviewChoice = assembleReview();
    $scope.feUser = ptaAcctService.getFEAccount();

}]);

/*
 ptaregistrationCtrl.ptaSelectedCostsmethod{
 "_id": "5484c1ddef11bd600c036d12",
 "schoolName": "JOHNS CREEK ELEMENTARY",
 "selectedMembership": "family",
 "selectedContribution": [],
 "selectedTextContribution": [],
 "taxExempt": false,
 "ptaName": "jcpta",
 "individual": true,
 "family": true,
 "individualCost": 8,
 "familyCost": 10,
 "membership": [],
 "contribution": [],
 "textContribution": []
 }*/
