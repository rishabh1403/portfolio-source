import React, { Component } from 'react';
import ListLs from './ListLs';

class Message extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <span className="shell"><b>$ ></b></span><span>{this.props.command[1]}</span>
        {this.props.command[0].type === 'LIST' ? <ListLs data={this.props.command[0]} /> : null}
      </div>
    );
  }
}

export default Message;
