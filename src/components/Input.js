import React, { Component } from 'react';
import '../stylesheets/main.css'; // for dev

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e.target.name, e.target.value);
  }
  render(){
    const data = Object.assign({}, this.props.data);
    switch (this.props.data.tag) {
      case ('textarea'):
        return (
          <div className="form-group">
            <label className="control-label" for={data.name}>{data.label}</label>
            <textarea
              id={data.name}
              name={data.name}
              type={data.type ? data.type : 'text'}
              placeholder={data.placeholder}
              className="form-control input-md"
              value={data.value ? data.value : this.state.value}
              onChange={this.onChange}
              required={data.required} 
            />
          </div>
        );
        break;
      default: 
        return (
          <div className="form-group">
            <label className="control-label" for={data.name}>{data.label}</label>
            <input
              id={data.name}
              name={data.name}
              type={data.type ? data.type : 'text'}
              placeholder={data.placeholder}
              className="form-control input-md"
              value={data.value ? data.value : this.state.value}
              onChange={this.onChange}
              required={data.required ? data.required : false} 
            />
          </div>
        );        
    }
  }
}

export default Input;