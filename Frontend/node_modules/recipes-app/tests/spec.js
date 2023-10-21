(function(RecipesInterface, $jquery) {

    var API_URL = 'http://recipes-learn-app.herokuapp.com/';

    beforeEach(function beforeEach() {

        expect(typeof RecipesInterface).toBe('function');
        expect(typeof RecipesInterface.prototype.makeRequest).toBe('function');
        expect(typeof RecipesInterface.prototype.addRecipe).toBe('function');
        expect(typeof RecipesInterface.prototype.deleteRecipe).toBe('function');
        expect(typeof RecipesInterface.prototype.getRecipes).toBe('function');
        expect(RecipesInterface.prototype.API_URL).toEqual(API_URL);

        var recipeInterface = new RecipesInterface();
        expect(recipeInterface.API_URL).toEqual(API_URL);
        expect(typeof recipeInterface.makeRequest).toBe('function');
        expect(typeof recipeInterface.addRecipe).toBe('function');
        expect(typeof recipeInterface.deleteRecipe).toBe('function');
        expect(typeof recipeInterface.getRecipes).toBe('function');

    });

    afterEach(function afterEach() {

        $jquery.ajax.restore();

    });

    describe('Recipes', function Recipes() {

        it('Should be able to get the recipes;', function() {

            var recipeInterface = new RecipesInterface(),
                mockResponse    = [1, 2, 3];

            sinon.stub($jquery, 'ajax').yieldsTo('successfulRequest', mockResponse);
            recipeInterface.getRecipes();
            var args = $jquery.ajax.getCall(0).args[0];

            expect($jquery.ajax.calledOnce).toBeTruthy();
            expect(args.url).toEqual(API_URL + 'recipes');
            expect(args.type).toEqual('GET');
            expect(args.dataType).toEqual('json');

            expect($jquery.ajax({
                successfulRequest: function successfulRequest(data) {
                    expect(data).toEqual(mockResponse);
                }
            }));

        });

        it('Should be able to delete the recipe;', function() {

            var recipeInterface = new RecipesInterface(),
                mockResponse    = [1, 2, 3],
                recipeModel     = { _id: 123, name: 'Chocolate Pudding' };

            sinon.stub($jquery, 'ajax').yieldsTo('successfulRequest', mockResponse);
            recipeInterface.deleteRecipe(recipeModel);
            var args = $jquery.ajax.getCall(0).args[0];

            expect($jquery.ajax.calledOnce).toBeTruthy();
            expect(args.url).toEqual(API_URL + 'recipes/' + recipeModel._id);
            expect(args.type).toEqual('DELETE');
            expect(args.dataType).toEqual('json');

            expect($jquery.ajax({
                successfulRequest: function successfulRequest(data) {
                    expect(data).toEqual(mockResponse);
                }
            }));

        });

        it('Should be able to add a recipe;', function() {

            var recipeInterface = new RecipesInterface(),
                mockResponse    = [1, 2, 3],
                recipeModel     = {
                    name:        'Chocolate Pudding',
                    description: 'A chocolate pudding!',
                    ingredients: ['Chocolate', 'Pudding']
                };

            sinon.stub($jquery, 'ajax').yieldsTo('successfulRequest', mockResponse);
            recipeInterface.addRecipe(recipeModel.name, recipeModel.description, recipeModel.ingredients);
            var args = $jquery.ajax.getCall(0).args[0];

            expect($jquery.ajax.calledOnce).toBeTruthy();
            expect(args.url).toEqual(API_URL + 'recipes');
            expect(args.type).toEqual('POST');
            expect(args.dataType).toEqual('json');
            expect(args.data.name).toEqual(recipeModel.name);
            expect(args.data.description).toEqual(recipeModel.description);
            expect(args.data.ingredients).toEqual(recipeModel.ingredients);

            expect($jquery.ajax({
                successfulRequest: function successfulRequest(data) {
                    expect(data).toEqual(mockResponse);
                }
            }));

        });

    });

})(window.RecipesInterface, window.jQuery);