import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import './styles/App.css';
import Traverse from './Traverse';
import Message from './Message';
import WelcomeText from './components/WelcomeText';

const traverse = new Traverse();

const getCurrentWorkingDirectory = () => traverse.pwd().data;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      commands: [],
      currentPath: getCurrentWorkingDirectory(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.contentEditable = React.createRef();
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.contentEditable.current.focus();
    setInterval(() => {
      this.contentEditable.current.focus();
    }, 100);
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
    let lsresult = [command, getCurrentWorkingDirectory()];

    if (commandOptions[0] === 'clear') {
      this.setState({
        commands: [],
      }, () => {
        this.setState({
          command: '',
          currentPath: getCurrentWorkingDirectory(),
        });
      });
      return null;
    }


    if (commandOptions[0] === 'ls') {
      lsresult = [traverse.ls(), ...lsresult];
    } else if (commandOptions[0] === 'pwd') {
      lsresult = [traverse.pwd(), ...lsresult];
    } else if (commandOptions[0] === 'cd') {
      lsresult = [traverse.cd(commandOptions[1]), ...lsresult];
    } else if (commandOptions[0] === 'help') {
      lsresult = [{
        data: 'User Needs Help',
        success: true,
        type: 'HELP',
      }, ...lsresult];
    } else if (commandOptions[0] === 'cat') {
      lsresult = [traverse.cat(commandOptions[1]), ...lsresult];
    }

    this.setState({
      commands: [...commands, lsresult],
    }, () => {
      this.setState({
        command: '',
        currentPath: getCurrentWorkingDirectory(),
      });
    });
    return null;
  }

  renderCommands() {
    const { commands } = this.state;
    return commands.map((el, index) => <Message key={index.toString()} command={el} />);
  }

  render() {
    const { currentPath, command } = this.state;
    return (
      <React.Fragment>
        <WelcomeText />
        {this.renderCommands()}
        <React.Fragment>

          <span className="shell">
            <b>
              {`${currentPath} `}
              $ &gt;
            </b>
          </span>

          <ContentEditable
            className="test"
            autoCorrect="off"
            autoCapitalize="none"
            innerRef={this.contentEditable}
            html={command} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={this.handleChange} // handle innerHTML change
            tagName="span" // Use a custom HTML tag (uses a div by default)
          />
          <div className="cursor" />
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default App;
