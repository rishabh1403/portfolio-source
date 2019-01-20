import React, { Component } from 'react';
import './App.css';
import Traverse from './Traverse';
import Message from './Message';

const traverse = new Traverse();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      commands: [],
    };
  }

  handleOnChange(e) {
    this.setState({
      command: e.target.value,
    });
  }

  handleClick() {
    const { command, commands } = this.state;
    this.setState({
      commands: [...commands, command],
    }, () => {
      this.setState({
        command: '',
      });
    });
  }

  renderCommands() {
    const { commands } = this.state;
    return commands.map((el, index) => {
      const lsresult = Object.keys(traverse.ls()).toString();

      return <Message key={index.toString()} command={lsresult} />;
    });
  }

  render() {
    const { command } = this.state;
    return (
      <div className="App">
        {this.renderCommands()}
        <div>
          <div>
            Type here
            <span>
              <input value={command} onChange={this.handleOnChange.bind(this)} />
            </span>
          </div>
          <button type="button" onClick={this.handleClick.bind(this)}>Add Command</button>
        </div>
      </div>
    );
  }
}

export default App;
