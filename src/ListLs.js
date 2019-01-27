import React, { Component } from 'react';

export default class extends Component {

  renderData(data) {
    let keys = Object.keys(data);
    return keys.reduce((acc, el) => {
      return [...acc, { [el]: data[el] }]
    }, []).map(el => {
      return <span>{Object.keys(el)[0]+ " "}</span>
    })
    // console.log(x)
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.data && this.renderData(this.props.data.data)}
      </div>
    );
  }
}
