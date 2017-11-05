import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AuthStore from '../../account/stores/AuthStore'
import * as RecipeFormActions from '../actions/RecipeFormActions'
import * as RecipeGroupActions from '../actions/RecipeGroupActions'
import bindIndexToActionCreators from '../../common/bindIndexToActionCreators'

import Loading from '../../base/components/Loading'
import RecipeForm from '../components/RecipeForm'

class From extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: AuthStore.getUser()
    };
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
    this.props.recipeActions.load(this.props.match.params.recipe);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.recipe !== this.props.match.params.recipe) {
      nextProps.recipeActions.load(nextProps.match.params.recipe);
      // nextProps.recipeActions.load(nextProps.match.params.recipe);
      window.scrollTo(0, 0);
    }
  }

  _onChange = () => {
    this.setState({user: AuthStore.getUser()});
  };

  render() {
    let { lists, recipes, match, status } = this.props;
    let { recipeActions, recipeItemActions } = this.props;
    let data = recipes.find(t => t.id == match.params.recipe);
    if (data) {
      let showEditLink = (this.state.user !== null && this.state.user.id === data.author);
      return (
          <RecipeForm
            {/*{ ...data }*/}
            // listStatus={ status }
            // lists={ lists }
            // showEditLink={ showEditLink }
            // recipeActions={ recipeActions }
            // recipeItemActions={ recipeItemActions }
          />
      );
    } else {
      return ( <Loading message="Loading"/> )
    }
  }
}

// Recipe.propTypes = {
//   recipes: PropTypes.array.isRequired,
//   lists: PropTypes.array.isRequired,
//   status: PropTypes.string.isRequired,
//   match: PropTypes.object.isRequired,
//   recipeActions: PropTypes.object.isRequired,
//   recipeItemActions: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  courses: state.recipe.courses,
  cuisines: state.recipe.cuisines,
  tags: state.recipe.tags,
});

const mapDispatchToProps = (dispatch, props) => ({
  recipeGroupActions: bindActionCreators(RecipeGroupActions, dispatch),
  recipeFormActions: bindActionCreators(
    bindIndexToActionCreators(RecipeFormActions, props.match.params.recipe),
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(From);
