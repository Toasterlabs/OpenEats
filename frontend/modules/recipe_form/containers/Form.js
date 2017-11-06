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
    this.props.recipeGroupActions.fetchCuisines();
    this.props.recipeGroupActions.fetchCourses();
    this.props.recipeGroupActions.fetchTags();
    this.props.recipeFormActions.load(this.props.match.params.recipe);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.recipe !== this.props.match.params.recipe) {
      nextProps.recipeGroupActions.load(nextProps.match.params.recipe);
      window.scrollTo(0, 0);
    }
  }

  _onChange = () => {
    this.setState({user: AuthStore.getUser()});
  };

  render() {
    let { tags, courses, cuisines, form } = this.props;
    let { recipeGroupActions, recipeFormActions } = this.props;
    // let form = form.find(t => t.id == match.params.recipe);
    if (form) {
      let showEditLink = (this.state.user !== null && this.state.user.id === form.author);
      return (
          <RecipeForm
            tags={ tags }
            courses={ courses }
            cuisines={ cuisines }
            form={ form }
            recipeGroupActions={ recipeGroupActions }
            recipeFormActions={ recipeFormActions }
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
  tags: state.recipeForm.tags,
  courses: state.recipeForm.courses,
  cuisines: state.recipeForm.cuisines,
  form: state.recipeForm.form,
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
