import React, { PureComponent } from 'react';
import ListLs from './ListLs';
import Help from './components/Help';
import Pwd from './components/Pwd';

class Message extends PureComponent {
  // eslint-disable-next-line class-methods-use-this
  renderCommandOutput(type, data) {
    if (type === 'LIST') {
      return <ListLs data={data} />;
    }
    if (type === 'HELP') {
      return <Help />;
    }
    if (type === 'PWD') {
      return <Pwd data={data.data} />;
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
