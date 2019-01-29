import React, { Component } from 'react';
import ListLs from './ListLs';
import Help from './components/Help';

class Message extends Component {
  // eslint-disable-next-line class-methods-use-this
  renderCommandOutput(type, data) {
    if (type === 'LIST') {
      return <ListLs data={data} />;
    }
    if (type === 'HELP') {
      return <Help />;
    }
    return null;
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <span className="shell"><b>{this.props.command[2] + ' '}$ ></b></span><span>{this.props.command[1]}</span>
        {this.renderCommandOutput(this.props.command[0].type, this.props.command[0])}
      </div>
    );
  }
}

export default Message;
