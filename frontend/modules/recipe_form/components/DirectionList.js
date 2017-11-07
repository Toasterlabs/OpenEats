import React from 'react'

import { TextArea } from '../../common/form/FormComponents'

class DirectionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || [],
      text: this.unarrayify(this.props.data || []),
      errors: this.props.errors || false,
    };
  }

  unarrayify = value => {
    return value.map((tag, key) => {
      return tag.title
    }).join('\n');
  };

  arrayify = value => {
    let dict = [];
    if (value) {
      let tags = value.split('\n');
      for (let title in tags) {
        dict.push({'title': tags[title].trim()})
      }
    }
    return dict
  };

  handleChange = (key, value) => {
    this.setState({
      data: this.arrayify(value),
      text: value
    });

    if(this.props.change) {
      this.props.change(key, this.arrayify(value));
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.data === undefined && this.props.data != nextProps.data) {
      this.setState({
        data: nextProps.data,
        text: this.unarrayify(nextProps.data)
      });
    }

    if ('errors' in nextProps) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    let className = "form-group";
    let errorMessage = false;
    if (this.state.errors !== false) {
      className += " has-error";
      errorMessage = (
        <span className="help-inline">{ this.state.errors[0] }</span>
      )
    }

    return (
      <TextArea
        name="directions"
        rows="4"
        label={ this.props.label }
        placeholder={ this.props.label }
        change={ this.handleChange }
        // change={ this.props.recipeFormActions.update }
        value={ this.state.text }
        // errors={ this.props.getErros('info') }
      />
    )
  }
}

export default DirectionList
