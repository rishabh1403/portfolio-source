import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import './styles/App.css';
import * as comm from './Traverse';
import Message from './Message';
import WelcomeText from './components/WelcomeText';
import obj from './util/data';


// console.log(comm['ls']([], obj));
// const traverse = new Traverse();
let index = 0;
// const getCurrentWorkingDirectory = () => traverse.pwd().data;

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
    // console.log("key change")
    // if (/<br>/.test(evt.target.value)) {
    //   console.log("enter is press");
    //   this.handleEnterPress();
    // }
    // console.log("enter is not press");
    this.setState({ command: evt.target.value });
  }

  handleKeyDown(e) {
    // let that = this;
    // console.log("key dowm")
    // console.log(e);
    // console.log(e.target.innerText);
    const { command, commands } = this.state;
    if (e.keyCode === 9) {
      e.preventDefault();
      const commandOptions = command.split(' ');
      const name = comm.getRecommendation(commandOptions[1], this.state.home, this.state.path);
      // console.log(name);
      if (name.length > 0) {
        this.setState(({ command: c }) => ({
          command: `${c.split(' ')[0]} ${name}`,
        }), () => {
          const el = document.getElementById('yup');
          const range = document.createRange();
          const sel = window.getSelection();
          range.setStart(el.childNodes[0], el.childNodes[0].length);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        });
      }
      // this.handleEnterPress();
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleEnterPress();
    }
    if (e.keyCode === 38) {
      e.preventDefault();
      index += 1;
      if (commands.length - index >= 0) {
        // console.log(this.state.commands[this.state.commands.length - index][1])
        this.setState(({ commands: c }) => ({
          command: c[c.length - index][1].trim(),
        }), () => {
          const el = document.getElementById('yup');
          const range = document.createRange();
          const sel = window.getSelection();
          range.setStart(el.childNodes[0], el.childNodes[0].length);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        });
      }
    }
    // else {
    //   this.setState({ command: e.target.textContent });
    // }
  }

  handleEnterPress() {
    index = 0;
    const { command, commands } = this.state;
    const commandOptions = command.split(' ');
    let lsresult = [command, comm.pwd(this.state.path).data];
    if (!commandOptions[0]) {
      this.setState({
        commands: [...commands, [{}, ...lsresult]],
      }, () => {
        this.setState({
          command: '',
          currentPath: comm.pwd(this.state.path).data,
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
      lsresult = [comm.ls(this.state.path, this.state.home, commandOptions[1]), ...lsresult];
    } else if (commandOptions[0] === 'pwd') {
      lsresult = [comm.pwd(this.state.path), ...lsresult];
    } else if (commandOptions[0] === 'cd') {
      const cdResult = comm.cd(commandOptions[1], this.state.path, this.state.prevPath, this.state.home);
      lsresult = [cdResult, ...lsresult];
      this.setState({
        path: cdResult.path,
        prevPath: cdResult.prevPath,
      });
    } else if (commandOptions[0] === 'help') {
      lsresult = [comm.help(), ...lsresult];
    } else if (commandOptions[0] === 'cat') {
      lsresult = [comm.cat(commandOptions[1], this.state.path, this.state.home), ...lsresult];
    }

    this.setState({
      commands: [...commands, lsresult],
    }, () => {
      this.setState({
        command: '',
        currentPath: comm.pwd(this.state.path).data,
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
        <React.Fragment>

          <span className="shell">
            <b>
              {`${currentPath} `}
              $ &gt;
            </b>
          </span>

          <ContentEditable
            className="test"
            id="yup"
            tabIndex="0"
            autoCorrect="off"
            autoCapitalize="none"
            innerRef={this.contentEditable}
            html={command} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={this.handleChange} // handle innerHTML change
            onKeyDown={this.handleKeyDown}
            tagName="span" // Use a custom HTML tag (uses a div by default)
          />
          <div className="cursor" />
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default App;
