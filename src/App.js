import React, { Component } from 'react';
import './App.css';
import Traverse from './Traverse';
import Message from './Message';
import WelcomeText from './WelcomeText'
import ContentEditable from 'react-contenteditable'

const traverse = new Traverse();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      commands: [],
      html: '',
      currentPath: traverse.pwd(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.contentEditable = React.createRef();
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.contentEditable.current.focus();
    setInterval(() => {
      this.contentEditable.current.focus();
    }, 1000);
  }

  handleChange(evt) {
    if (/<br>/.test(evt.target.value)) {
      this.handleEnterPress();
    }
    this.setState({ command: evt.target.value });
  }

  handleEnterPress() {
    const { command, commands } = this.state;
    const commandOptions = command.split(' ');
    let lsresult = [command, traverse.pwd()];

    if (commandOptions[0] === 'clear') {
      this.setState({
        commands: [],
      }, () => {
        this.setState({
          command: '',
          currentPath: traverse.pwd(),
        });
      });
      return null;
    }


    if (commandOptions[0] === 'ls') {
      lsresult = [traverse.ls(), ...lsresult];
    } else if (commandOptions[0] === 'cd') {
      lsresult = [traverse.cd(commandOptions[1]), ...lsresult];
    } else if (commandOptions[0] === 'help') {
      lsresult = `Type 'ls' to check contents of current directory, 'cd' to change directory`;
    }

    this.setState({
      commands: [...commands, lsresult],
    }, () => {
      this.setState({
        command: '',
        currentPath: traverse.pwd(),
      });
    });
    return null;
  }

  renderCommands() {
    const { commands } = this.state;
    return commands.map((el, index) => {
      // const lsresult = Object.keys(traverse.ls()).toString();

      return <Message key={index.toString()} command={el} />;
    });
  }

  render() {
    return (
      <React.Fragment>
        <WelcomeText />
        {this.renderCommands()}
        <React.Fragment>

          <span className="shell"><b>{this.state.currentPath + ' '}$ ></b></span>

          <ContentEditable
            className="test"
            autoCorrect="off"
            autoCapitalize="none"
            innerRef={this.contentEditable}
            html={this.state.command} // innerHTML of the editable div
            disabled={false}       // use true to disable editing
            onChange={this.handleChange} // handle innerHTML change
            tagName='span' // Use a custom HTML tag (uses a div by default)
          />
          <div className="cursor" />
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default App;
