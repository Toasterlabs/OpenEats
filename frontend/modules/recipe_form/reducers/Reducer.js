import { combineReducers } from 'redux'
import { default as form } from './RecipeFormReducer'
import { default as recipeGroups } from './RecipeGroupsReducer'

const recipe = combineReducers({
  form,
  recipeGroups,
});

export default recipe
