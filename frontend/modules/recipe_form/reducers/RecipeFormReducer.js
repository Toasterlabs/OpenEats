import RecipeFormConstants from '../constants/RecipeFormConstants'

function form(state = [], action) {
  switch (action.type) {
    case RecipeFormConstants.RECIPE_FORM_INIT:
      return action.data;
    case RecipeFormConstants.RECIPE_FORM_UPDATE:
      let newState = [];
      newState[action.name] = action.value;
      return { ...state, ...newState };
    default:
      return state;
  }
}

export default form
