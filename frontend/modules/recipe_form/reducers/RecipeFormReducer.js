import RecipeFormConstants from '../constants/RecipeFormConstants'

function form(state = [], action) {
  switch (action.type) {
    case RecipeFormConstants.RECIPE_FORM_INIT:
      return action.data;
    default:
      return state;
  }
}


export default form
