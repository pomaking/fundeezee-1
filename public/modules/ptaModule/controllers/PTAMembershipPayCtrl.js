'use strict';

ptaControllersModule.controller('PTAMembershipPayCtrl', ['$scope', '$http', '$state', 'ptaAcctService', function($scope, $http, $state, ptaAcctService) {
    $scope.reviewChoice = {};
    $scope.feUser = {};


   $scope.checkout = function (ptaMembershipSelectedCosts, ptaPaymentForm) {
        // call balancedjs - placeholder for now
        console.log('ctrl.checkout');
        ptaAcctService.checkout();
        //



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
        } else if(membership == 'family'){
            review.display = 'Family';
            review.mCost  = x.familyCost;
            review.tCost = x.familyCost + 1;
        } else if(membership == 'faculty'){
            review.display = 'Faculty';
            review.mCost  = x.facultyCost;
            review.tCost = x.facultyCost + 1;
        } else if(membership == 'business'){
            review.display = 'Business';
            review.mCost  = x.businessCost;
            review.tCost = x.businessCost + 1;
        } else {
            for(var i = 0; i < x.membership.length; i++){
                var field = x.membership[i];
                if( field.field_title == membership){
                    review.display = membership;
                    review.mCost  = field.field_cost;

                    var y = Number(field.field_cost);
                    review.tCost = y + 1;
                }
            }
        }


        ptaAcctService.setChoice(review);
        return review;

    }

    $scope.reviewChoice = assembleReview();
    $scope.feUser = ptaAcctService.getFEAccount();
    //$scope.feCost = ptaAcctService.getCosts();

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
