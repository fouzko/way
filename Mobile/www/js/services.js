angular.module('services', [])

/*
 * Api SERVICE
 */
.factory('api', function ($http, $q, config, overlay) {

    return {

        goodDealByCategory: function (category) {

            overlay.set(true);

            category = category || 'geek';

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/deal/category/' + category
            })
                .success(function (result) {
                    overlay.set(false);
                    deferred.resolve(result.deal);
                })
                .error(function (result) {
                    overlay.set(false);
                    deferred.resolve('Erreur :' + result);
                });

            return deferred.promise;

        },

        goodDealById: function (id) {

            overlay.set(true);

            id = id || 1;

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/deal/' + id
            })
                .success(function (result) {
                    overlay.set(false);
                    deferred.resolve(result.deal);
                })
                .error(function (result) {
                    overlay.set(false);
                    deferred.resolve('Erreur :' + result);
                });

            return deferred.promise;
        },

        goodDealPrimary: function (category) {

            overlay.set(true);

            category = category || 'geek';

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/deal/first/'+category
            })
                .success(function (result) {
                    overlay.set(false);
                    deferred.resolve(result.deals);
                })
                .error(function (result) {
                    overlay.set(false);
                    deferred.resolve('Erreur :' + result);
                });

            return deferred.promise;
        }
    };
})

/*
 * Overlay SERVICE
 */
.service('overlay', function (config) {

    this.set = function (value) {
        config.overlay = value;
    };

    this.get = function () {
        return config.overlay;
    };

})
/*
 * Category SERVICE
 */
.service('category', function (config) {

    this.set = function (value) {
        config.currentCategory = value;
    };

    this.get = function () {
        return config.currentCategory;
    };

})

/*
 * Share SERVICE
 */
.service('share', function($window){

    this.seed = function(social, text){

        if(social === 'facebook'){
            $window.plugins.socialsharing.shareViaFacebook(text);
        }
        else{
            $window.plugins.socialsharing.shareViaTwitter(text);
        }
    }

});
