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

  handleChange = event => {
    this.setState({
      data: this.arrayify(event.target.value),
      text: event.target.value
    });

    if(this.props.change) {
      this.props.change(event.target.name, this.arrayify(event.target.value));
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

    console.log(this.props)
    console.log(this.state)

      // {/*<div className={this.props.size} key={this.props.id}>*/}
      //   {/*<div className={ className }>*/}
      //     {/*{this.props.label ? <label>{this.props.label}</label> : null}*/}
      //     {/*<input type="text"*/}
      //            {/*name={ this.props.name }*/}
      //            {/*className="form-control"*/}
      //            {/*placeholder={this.props.placeholder}*/}
      //            {/*value={this.state.text}*/}
      //            {/*onChange={this.handleChange}*/}
      //            {/*/>*/}
      //     {/*{ errorMessage }*/}
      //   {/*</div>*/}
      // {/*</div>*/}
    return (
      <TextArea
        name="info"
        rows="4"
        label={ this.props.label }
        placeholder={ this.props.label }
        // change={ this.props.recipeFormActions.update }
        value={ this.state.text }
        // errors={ this.props.getErros('info') }
      />
    )
  }
}

export default DirectionList
