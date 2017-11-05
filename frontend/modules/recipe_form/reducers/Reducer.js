import { combineReducers } from 'redux'
import { default as recipeGroups } from './RecipeGroupsReducer'

const recipe = combineReducers({
  recipeGroups,
});

export default recipe
