/* eslint-disable */

import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import './styles/App.css';
import { getRecommendation, sanitizeInput, setCaretToEnd } from './util/util';
import * as comm from './commands';
import Message from './Message';
import ShellPrompt from './ShellPrompt';
import WelcomeText from './components/WelcomeText';
import obj from './util/data';

let index = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      home: obj,
      path: [],
      prevPath: [],
      commands: [],
      currentPath: comm.pwd([]).data,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.contentEditable = React.createRef();
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.contentEditable.current.focus();
    setInterval(() => {
      this.contentEditable.current.focus();
    }, 100);
    // eslint-disable-next-line
    console.log("%cNitin Stop Looking At my console for errors, now you won't find any", 'background: black; color: green; font-size: x-large');
  }

  handleChange(evt) {
    this.setState({ command: evt.target.value });
  }

  handleKeyDown(e) {
    const { command, commands } = this.state;
    if (e.keyCode === 9) {
      e.preventDefault();
      const commandOptions = command.split(' ');
      const name = getRecommendation(commandOptions[1], this.state.home, this.state.path);
      if (name.length > 0) {
        this.setState(({ command: c }) => ({
          command: `${c.split(' ')[0]} ${name}`,
        }), () => {
          setCaretToEnd('yup');
        });
      }
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleEnterPress();
    }
    if (e.keyCode === 38) {
      e.preventDefault();
      index += 1;
      if (commands.length - index >= 0) {
        this.setState(({ commands: c }) => ({
          command: c[c.length - index][1].trim(),
        }), () => {
          setCaretToEnd('yup');
        });
      }
    }
  }

  handleEnterPress() {
    index = 0;
    const { command, commands, path, home, prevPath } = this.state;
    const commandOptions = sanitizeInput(command);
    let lsresult = [sanitizeInput(command).join(' '), comm.pwd(path).data];
    if (!commandOptions[0]) {
      this.setState({
        commands: [...commands, [{}, ...lsresult]],
      }, () => {
        this.setState({
          command: '',
          currentPath: comm.pwd(path).data,
        });
      });
      return null;
    }

    if (commandOptions[0] === 'clear') {
      this.setState({
        commands: [],
      }, () => {
        this.setState({
          command: '',
          currentPath: comm.pwd(this.state.path).data,
        });
      });
      return null;
    }


    if (commandOptions[0] === 'ls') {
      lsresult = [comm.ls(path, home, commandOptions[1]), ...lsresult];
    } else if (commandOptions[0] === 'pwd') {
      lsresult = [comm.pwd(path), ...lsresult];
    } else if (commandOptions[0] === 'cd') {
      const cdResult = comm.cd(commandOptions[1], path, prevPath, home);
      lsresult = [cdResult, ...lsresult];
      this.setState({
        path: cdResult.path,
        prevPath: cdResult.prevPath,
      });
    } else if (commandOptions[0] === 'help') {
      lsresult = [comm.help(), ...lsresult];
    } else if (commandOptions[0] === 'cat') {
      lsresult = [comm.cat(path, home, commandOptions[1]), ...lsresult];
    }

    this.setState({
      commands: [...commands, lsresult],
    }, () => {
      this.setState({
        command: '',
        currentPath: comm.pwd(path).data,
      });
    });
    return null;
  }

  renderCommands() {
    const { commands } = this.state;
    return commands.map((el, idx) => <Message key={idx.toString()} command={el} />);
  }

  render() {
    const { currentPath, command } = this.state;
    return (
      <React.Fragment>
        <WelcomeText />
        {this.renderCommands()}
        <ShellPrompt path={currentPath} />
        <ContentEditable
          className="test"
          id="yup"
          tabIndex="0"
          autoCorrect="off"
          autoCapitalize="none"
          innerRef={this.contentEditable}
          html={command}
          disabled={false}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          tagName="span"
        />
        <div className="cursor" />
      </React.Fragment>
    );
  }
}

export default App;
