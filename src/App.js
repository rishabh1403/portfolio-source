/* eslint-disable */

import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import './styles/App.css';
import {
  getRecommendation,
  match,
  sanitizeInput, setCaretToEnd, noArgs
} from './util/util';
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
      previousPath: [],
      oldCommands: [],
      presentWorkingDirectory: comm.pwd([]).data,
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
    if (e.keyCode === 9) {
      e.preventDefault();
      this.handleTabPress();
    }

    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleEnterPress();
    }

    if (e.keyCode === 38) {
      e.preventDefault();
      this.handleUpArrowPress();
    }
  }

  handleTabPress() {
    const { command, home, path } = this.state;
    const commandArray = command.split(' ');
    const name = getRecommendation(commandArray[1], home, path);
    if (name.length > 0) {
      this.setState({
        command: `${commandArray[0]} ${name}`,
      }, () => {
        setCaretToEnd('yup');
      });
    }
  }

  handleUpArrowPress() {
    index += 1;
    const { oldCommands } = this.state;
    if (oldCommands.length - index >= 0) {
      this.setState({
        command: oldCommands[oldCommands.length - index][1].trim(),
      }, () => {
        setCaretToEnd('yup');
      });
    }
  }
  updateStateWithCommandResults(oldCommands,newLs,path){
    this.setState({
      oldCommands: [...oldCommands, newLs],
    }, () => {
      this.setState({
        command: '',
        presentWorkingDirectory: comm.pwd(path).data,
      });
    });
  }
  handleNoArgs(oldCommands, lsresult, path) {
    let newLs = [{},...lsresult];
    this.updateStateWithCommandResults(oldCommands,newLs,path);
  }
  handleClearCommand(path) {
    this.setState({
      oldCommands: [],
    }, () => {
      this.setState({
        command: '',
        presentWorkingDirectory: comm.pwd(path).data,
      });
    });
  }
  handleLsCommand(path, home, commandOptions, lsresult, oldCommands) {
    let newLs = [comm.ls(path, home, commandOptions), ...lsresult];
    this.updateStateWithCommandResults(oldCommands,newLs,path);
  }
  handlePwdCommand(path, lsresult, oldCommands) {
    let newLs = [comm.pwd(path), ...lsresult];
    this.updateStateWithCommandResults(oldCommands,newLs,path);
  }
  handleHelpCommand(path, lsresult, oldCommands) {
    let newLs = [comm.help(), ...lsresult];
    this.updateStateWithCommandResults(oldCommands,newLs,path);
  }
  handleCatCommand(path, home, commandOptions, lsresult, oldCommands) {
    let newLs = [comm.cat(path, home, commandOptions), ...lsresult];
    this.updateStateWithCommandResults(oldCommands,newLs,path);
  }
  handleCdCommand(path, home, commandOptions, lsresult, oldCommands, previousPath) {
    const cdResult = comm.cd(commandOptions, path, previousPath, home);
    let newLs = [cdResult, ...lsresult];
    this.setState({
      path: cdResult.path,
      previousPath: cdResult.previousPath,
    });
    this.updateStateWithCommandResults(oldCommands,newLs,path);
  }
  handleEnterPress() {
    index = 0;
    const { command, oldCommands, path, home, previousPath } = this.state;
    const commandOptions = sanitizeInput(command);
    let lsresult = [sanitizeInput(command).join(' '), comm.pwd(path).data];
    const isCommand = match(commandOptions[0]);

    if (noArgs(commandOptions[0])) {
      this.handleNoArgs(oldCommands, lsresult, path)
      return null;
    }

    if (isCommand('clear')) {
      this.handleClearCommand(path)
      return null;
    }

    if (isCommand('ls')) {
      this.handleLsCommand(path, home, commandOptions[1], lsresult, oldCommands)
      return null;
    }

    if (isCommand('pwd')) {
      this.handlePwdCommand(path, lsresult, oldCommands)
      return null;
    }

    if (isCommand('help')) {
      this.handleHelpCommand(path, lsresult, oldCommands)
      return null;
    }

    if (isCommand('cat')) {
      this.handleCatCommand(path, home, commandOptions[1], lsresult, oldCommands)
      return null;
    }
    if (isCommand('cd')) {
      this.handleCdCommand(path, home, commandOptions[1], lsresult, oldCommands, previousPath)
      return null;
    }
    return null;
  }

  renderCommands() {
    const { oldCommands } = this.state;
    return oldCommands.map((el, idx) => <Message key={idx.toString()} command={el} />);
  }

  render() {
    const { presentWorkingDirectory, command } = this.state;
    return (
      <React.Fragment>
        <WelcomeText />
        {this.renderCommands()}
        <ShellPrompt path={presentWorkingDirectory} />
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
