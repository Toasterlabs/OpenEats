import { request } from '../../common/CustomSuperagent';
import RecipeFormConstants from '../constants/RecipeFormConstants';
import { serverURLs } from '../../common/config'

export const submit = (data) => {
  return (dispatch) => {
    let photo = false;
    if (typeof data.photo == "object") {
      photo = data.photo;
    }

    delete data['photo'];
    delete data['photo_thumbnail'];

    if (!('id' in data)) {
      data['ingredient_groups'] = data['ingredients'];
      // delete data['ingredients'];
    }

    if (data['ingredient_groups']) {
      let ingredientGroups = [];
      let ingGroups = JSON.parse(JSON.stringify(data['ingredient_groups']));
      ingGroups.map((ingredient) => {
        let group = ingredient.group;
        let added = false;
        ingredientGroups.map((ingredient_group) => {
          if (ingredient_group.title === group) {
            ingredient_group.ingredients.push({
              title: ingredient.title,
              quantity: ingredient.quantity,
              measurement: ingredient.measurement,
            });
            added = true;
          }
        });

        if (!added) {
          let ingredients = [{
            title: ingredient.title,
            quantity: ingredient.quantity,
            measurement: ingredient.measurement,
          }];

          ingredientGroups.push({
            title: group,
            ingredients: ingredients,
          })
        }
      });

      data['ingredient_groups'] = ingredientGroups;
    }

    let r = 'id' in data ?
      request().put(serverURLs.recipe + data.id + '/') :
      request().post(serverURLs.recipe);

    r.send(data)
      .end((err, res) => {
        if (!err && res) {
          //send the image once the file has been created

          if (photo) {
            this.submitPhoto(res, photo);
          } else {
            this.handleSubmit(res.body.id);
          }
        } else {
          console.error(serverURLs.recipe, err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }
};

export const submitPhoto = (res, photo) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.recipe + res.body.id + "/")
      .attach('photo', photo)
      .end((err, res) => {
        if (!err && res) {
          this.handleSubmit(res.body.id);
        } else {
          console.error(serverURLs.recipe, err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }
};

export const handleSubmit = (new_recipe_id) => {
  return (dispatch) => {
    dispatch({
      type: RecipeFormConstants.SUBMIT,
      new_recipe_id: new_recipe_id
    });
  }
};

export const error = (error) => {
  return (dispatch) => {
    dispatch({
      type: RecipeFormConstants.ERROR,
      error: error
    });
  }
};

export const update = (name, value) => {
  return (dispatch) => {
    dispatch({
      type: RecipeFormConstants.UPDATE,
      name: name,
      value: value,
    });
  }
};

export const fetchRecipeList = (searchTerm) => {
  return (dispatch) => {
    request().get(serverURLs.recipe + '?fields=id,title&limit=5&search=' + searchTerm)
      .end((err, res) => {
        if (!err && res) {
          let recipeList = [];
          res.body.results.map((recipe) => {
            recipeList.push(recipe.title);
          });
          dispatch({
            type: RecipeFormConstants.UPDATE_RECIPE_LIST,
            recipeList: recipeList,
          });
        } else {
          console.error(serverURLs.course, err.toString());
        }
      });
  }
};

export const fetchRecipe = (recipe_id) => {
  return (dispatch) => {
    var url = serverURLs.recipe + recipe_id;
    request()
      .get(serverURLs.recipe + recipe_id)
      .then(res => {
        let data = res.body;
        let ings = [];
        if (data.ingredient_groups) {
          let ingGroups = JSON.parse(JSON.stringify(data.ingredient_groups));
          ingGroups.map((ingredient_group) => {
            ingredient_group.ingredients.map((ingredient) => {
              ings.push({
                title: ingredient.title,
                quantity: ingredient.quantity,
                measurement: ingredient.measurement,
                group: ingredient_group.title
              })
            });
          });
          data.ingredient_groups = ings;
        }
        dispatch({
          type: RecipeFormConstants.RECIPE_FORM_INIT,
          data: data,
        });
      })
  }
};
