import React, { Component } from 'react';

export default class extends Component {

  render() {
    console.log(this.props);
    return (
      <span className="file-name">
        {this.props.data}
      </span>
    );
  }
}
