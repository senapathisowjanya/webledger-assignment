(function($window, $jquery, $q) {

    'use strict';

    /**
     * @module Recipes
     * @link https://github.com/Wildhoney/Recipes
     * @license MIT
     * @version $id$
     * @constructor
     */
    $window.RecipesInterface = function RecipesInterface() {};

    /**
     * @property prototype
     * @type {Object}
     */
    $window.RecipesInterface.prototype = {

        /**
         * API endpoint for AJAX requests.
         *
         * @constant API_URL
         * @type {String}
         */
        API_URL: 'http://recipes-learn-app.herokuapp.com/',

        /**
         * Interface for issuing AJAX requests through.
         *
         * @method makeRequest
         * @access protected
         * @example makeRequest('recipes', 'DELETE')
         * @param {String} path - Relative path to the URL resource.
         * @param {String} [type='GET'] - HTTP verb to be used in the request.
         * @param {Object} [params={}] - Additional request params.
         * @return {Q.promise}
         */
        makeRequest: function makeRequest(path, type, params) {

            /**
             * AJAX request success handler.
             *
             * @method successfulRequest
             * @access public
             * @return {void}
             */
            var successfulRequest = function successfulRequest(response) {
                deferred.resolve(response);
            }.bind(this);

            var deferred = $q.defer();

            $jquery.ajax({
                url: this.API_URL + path,
                data: params || {},
                dataType: 'json',
                type: type || 'GET',
                successfulRequest: successfulRequest
            });

            return deferred.promise;

        },

        /**
         * Responsible for adding a particular recipe.
         *
         * @method addRecipe
         * @access public
         * @example addRecipe('Chocolate Cake', 'It is a chocolate cake', ['Chocolate', 'Cake'])
         * @param {String} name - Name of the recipe.
         * @param {String} description - Description of the recipe.
         * @param {Array} ingredients - Ingredients for the recipe.
         * @return {Q.promise}
         */
        addRecipe: function addRecipe(name, description, ingredients) {

            return this.makeRequest('recipes', 'POST', {
                name:        name,
                description: description,
                ingredients: ingredients
            });

        },

        /**
         * Responsible for deleting recipes given a model.
         *
         * @method deleteRecipe
         * @access public
         * @example deleteRecipe({ _id: 123, name: 'Banana Cake' })
         * @param {Object} recipeModel - Model that is returned from `addRecipe`.
         * @return {Q.promise}
         */
        deleteRecipe: function deleteRecipe(recipeModel) {
            return this.makeRequest('recipes/' + recipeModel._id, 'DELETE');
        },

        /**
         * Responsible for retrieving all of the recipes.
         *
         * @method getRecipes
         * @access public
         * @return {Q.promise}
         */
        getRecipes: function getRecipes() {
            return this.makeRequest('recipes', 'GET');
        }

    };

})(window, window.jQuery, window.Q);