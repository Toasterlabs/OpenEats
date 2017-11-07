import React from 'react'
import {
    injectIntl,
    defineMessages,
} from 'react-intl';

import { IngredientList, SubRecipeList } from './DataList'
import DirectionList from './DirectionList'
import TagList from './TagList'
import { Input, File, Alert, Select, TextArea } from '../../common/form/FormComponents'

require("./../css/create.scss");

class RecipeForm extends React.Component {
  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      name_label: {
        id: 'recipe.create.name_label',
        description: 'Recipe name label',
        defaultMessage: 'Recipe name',
      },
      name_placeholder: {
        id: 'recipe.create.name_placeholder',
        description: 'Recipe name placeholder',
        defaultMessage: 'Recipe',
      },
      course_label: {
        id: 'recipe.create.course_label',
        description: 'Course label',
        defaultMessage: 'Course',
      },
      cuisine_label: {
        id: 'recipe.create.cuisine_label',
        description: 'Cuisine label',
        defaultMessage: 'Cuisine',
      },
      tags_label: {
        id: 'recipe.create.tags_label',
        description: 'Tags label',
        defaultMessage: 'Tags',
      },
      prep_time_label: {
        id: 'recipe.create.prep_time_label',
        description: 'Prep time label',
        defaultMessage: 'Prep time',
      },
      prep_time_placeholder: {
        id: 'recipe.create.prep_time_placeholder',
        description: 'Prep time placeholder',
        defaultMessage: 'Prep time in minutes',
      },
      cooking_time_label: {
        id: 'recipe.create.cooking_time_label',
        description: 'Cooking time label',
        defaultMessage: 'Cooking time',
      },
      cooking_time_placeholder: {
        id: 'recipe.create.cooking_time_placeholder',
        description: 'Cooking time placeholder',
        defaultMessage: 'Cooking time in minutes',
      },
      servings_label: {
        id: 'recipe.create.servings_label',
        description: 'Servings label',
        defaultMessage: 'Servings',
      },
      servings_placeholder: {
        id: 'recipe.create.servings_placeholder',
        description: 'Servings placeholder',
        defaultMessage: 'Servings',
      },
      rating_label: {
        id: 'recipe.create.rating_label',
        description: 'Rating label',
        defaultMessage: 'Rating',
      },
      rating_placeholder: {
        id: 'recipe.create.rating_placeholder',
        description: 'Rating placeholder',
        defaultMessage: 'Rate this recipe from 0 to 5',
      },
      subrecipes_label: {
        id: 'recipe.create.subrecipes_label',
        description: 'Recipe links label',
        defaultMessage: 'Recipe links',
      },
      ingredients_label: {
        id: 'recipe.create.ingredients_label',
        description: 'Recipe ingredients label',
        defaultMessage: 'Ingredients',
      },
      directions_label: {
        id: 'recipe.create.directions_label',
        description: 'Rating label',
        defaultMessage: 'Directions',
      },
      information_label: {
        id: 'recipe.create.information_label',
        description: 'Recipe information label',
        defaultMessage: 'Recipe information',
      },
      information_placeholder: {
        id: 'recipe.create.information_placeholder',
        description: 'Recipe information placeholder',
        defaultMessage: 'A quick description of the recipe',
      },
      source_label: {
        id: 'recipe.create.source_label',
        description: 'Rating source label',
        defaultMessage: 'Source',
      },
      source_placeholder: {
        id: 'recipe.create.source_placeholder',
        description: 'Rating source placeholder',
        defaultMessage: 'URL source of the recipe (if any)',
      },
      photo_label: {
        id: 'recipe.create.photo_label',
        description: 'Photo label',
        defaultMessage: 'Photo',
      },
      photo_placeholder: {
        id: 'recipe.create.photo_placeholder',
        description: 'Photo placeholder',
        defaultMessage: 'Photo',
      },
      submit: {
        id: 'recipe.create.submit',
        description: 'Submit recipe button',
        defaultMessage: 'Submit recipe',
      }
    });

    console.log(this.props);

    return (
      <div className="container">
        <div className="row">
          <form className="recipe-form">
            { this.props.errors ? ( <Alert/> ) : ''}
            <div id="recipe" className="col-md-4">
              { this.props.form.photo_thumbnail ?
                <img src={ this.props.form.photo_thumbnail } /> :
                null
              }
              <File
                name="photo"
                label={ formatMessage(messages.photo_label) }
                placeholder={ formatMessage(messages.photo_placeholder) }
                accept="image/*"
                change={ this.props.recipeFormActions.update }
              />

              <div className="row">
                <Select
                  name="course"
                  data={ this.props.courses }
                  label={ formatMessage(messages.course_label) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.course }
                  // errors={ this.props.getErros('course') }
                />
                <Select
                  name="cuisine"
                  data={ this.props.cuisines }
                  label={ formatMessage(messages.cuisine_label) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.cuisine }
                  // errors={ this.props.getErros('cuisine') }
                />
                <TagList
                  name="tags"
                  data={ this.props.tags }
                  label={ formatMessage(messages.tags_label) }
                  size="col-sm-12 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  tags={ this.props.form.tags }
                  // errors={ this.props.getErros('tags') }
                />
              </div>

              <div className="row">
                <Input
                  name="prep_time"
                  type="number"
                  label={ formatMessage(messages.prep_time_label) }
                  placeholder={ formatMessage(messages.prep_time_placeholder) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.prep_time }
                  // errors={ this.props.getErros('prep_time') }
                />
                <Input
                  name="cook_time"
                  type="number"
                  label={ formatMessage(messages.cooking_time_label) }
                  placeholder={ formatMessage(messages.cooking_time_placeholder) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.cook_time }
                  // errors={ this.props.getErros('cook_time') }
                />
                <Input
                  name="servings"
                  type="number"
                  label={ formatMessage(messages.servings_label) }
                  placeholder={ formatMessage(messages.servings_placeholder) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.servings }
                  // errors={ this.props.getErros('servings') }
                />
                <Input
                  name="rating"
                  type="number"
                  label={ formatMessage(messages.rating_label) }
                  placeholder={ formatMessage(messages.rating_placeholder) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.rating }
                  // errors={ this.props.getErros('rating') }
                />
              </div>


              {/*<SubRecipeList*/}
                {/*name="subrecipes"*/}
                {/*label={ formatMessage(messages.subrecipes_label) }*/}
                {/*change={ this.props.recipeFormActions.update }*/}
                {/*data={ this.props.subrecipes }*/}
                {/*recipeList={ this.state.recipeList }*/}
                {/*errors={ this.props.getErros('subrecipes') } />*/}
              {/*<IngredientList*/}
                {/*name="ingredients"*/}
                {/*label={ formatMessage(messages.ingredients_label) }*/}
                {/*change={ this.props.recipeFormActions.update }*/}
                {/*data={ this.props.recipe.ingredient_groups }*/}
                {/*errors={ this.props.getErros('ingredients') } />*/}
              {/*<Input*/}
                {/*name="source"*/}
                {/*type="text"*/}
                {/*label={ formatMessage(messages.source_label) }*/}
                {/*placeholder={ formatMessage(messages.source_placeholder) }*/}
                {/*change={ this.props.recipeFormActions.update }*/}
                {/*value={ this.props.recipe.source }*/}
                {/*errors={ this.props.getErros('source') } />*/}

            </div>
            <div id="recipe" className="col-md-8">
              <Input
                name="title"
                type="text"
                label={ formatMessage(messages.name_label) }
                placeholder={ formatMessage(messages.name_placeholder) }
                change={ this.props.recipeFormActions.update }
                value={ this.props.form.title }
                // errors={ this.props.getErrors('title') }
              />
              <TextArea
                name="info"
                rows="4"
                label={ formatMessage(messages.information_label) }
                placeholder={ formatMessage(messages.information_placeholder) }
                change={ this.props.recipeFormActions.update }
                value={ this.props.form.info }
                // errors={ this.props.getErros('info') }
              />
              <DirectionList
                name="directions"
                label={ formatMessage(messages.directions_label) }
                change={ this.props.recipeFormActions.update }
                data={ this.props.form.directions }
                // errors={ this.props.getErros('directions') }
              />
              <Input
                name="source"
                type="text"
                label={ formatMessage(messages.source_label) }
                placeholder={ formatMessage(messages.source_placeholder) }
                change={ this.props.recipeFormActions.update }
                value={ this.props.form.source }
                // errors={ this.props.getErros('source') }
              />

              <button
                className="btn btn-primary"
                onClick={ this.props.recipeFormActions.submit }>
                  { formatMessage(messages.submit) }
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default injectIntl(RecipeForm);