# Learn Recipes

Base Python API for a series of on-going *recipe learning* projects in various front-end frameworks.

## Flavours

* [React.js](https://github.com/Wildhoney/Recipes.React);
* [Ember.js](https://github.com/Wildhoney/Recipes.Ember);
* [Angular.js](https://github.com/Wildhoney/Recipes.Angular);
* [Meteor.js](https://github.com/Wildhoney/Recipes.Meteor);

## API Endpoints

**Read:**

```shell
curl -i http://localhost:5000/recipes
     -X GET
```

**Create:**

```shell
curl -i http://localhost:5000/recipes
     -X POST
     -H "Content-Type: application/json"
     -d '{"name":"Banana Cake","description":"Delectable banana cake!","ingredients":["Banana","Flour"]}'
```

**Delete:**

<sub><sup>Assume that **`123456789`** is the model's primary key in MongoDB.</sup></sub>

```shell
curl -i http://localhost:5000/recipes/123456789
     -X DELETE
```