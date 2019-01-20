import React, { Component } from 'react';
import './App.css';
import Message from './Message';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      command: "",
      commands: [],
    }
  }

  handleOnChange(e) {
    this.setState({
      command: e.target.value
    })
  }
  renderCommands() {
    return this.state.commands.map(el => {
      return <Message command={el} />
    })
  }
  handleClick() {
    this.setState({
      commands: [...this.state.commands, this.state.command]
    }, () => {
      this.setState({
        command: ""
      })
    })
  }
  render() {
    return (
      <div className="App">
        {this.renderCommands()}
        <div>
          <div>Type here <span><input value={this.state.command} onChange={this.handleOnChange.bind(this)} /></span></div>
          <button onClick={this.handleClick.bind(this)} >Add Command</button>
        </div>
      </div>
    );
  }
}

export default App;
