import React, { Component } from 'react';
import ListLs from './ListLs';
class Message extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.command.type === 'LIST' ? <ListLs data={this.props.command} /> : null}
      </div>
    );
  }
}

export default Message;
