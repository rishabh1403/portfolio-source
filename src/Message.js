import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        {this.props.command}
      </div>
    );
  }
}

export default Message;
