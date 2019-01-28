import React, { Component } from 'react';
import Directory from './Directory';
import File from './File';
export default class extends Component {

  renderData(data) {
    let keys = Object.keys(data);
    return keys.reduce((acc, el) => {
      return [...acc, [el, data[el]]]
    }, []).map(el => {
      if (el[1].type === 'directory') {
        return <Directory data={el[0] + " "} />
      }else{
        return <File data={el[0] + " "} />
      }

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
