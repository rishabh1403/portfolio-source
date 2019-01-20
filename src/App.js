import React, { Component } from 'react';
import './App.css';
import Traverse from './Traverse';
import Message from './Message';
import ContentEditable from 'react-contenteditable'

const traverse = new Traverse();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      commands: [],
      html: ""
    };
    this.contentEditable = React.createRef();
    // this.state = { html: "<b>Hello <i>World</i></b>" };
    this.textInput = React.createRef();
  }
  handleChange = evt => {
    console.log(evt);
    if (evt.nativeEvent.inputType === 'insertParagraph') {
      // console.log("enter press")
      this.handleClick();
    }
    this.setState({ command: evt.target.value });
  };
  handleClick(e) {
    // e.preventDefault();
    const { command, commands } = this.state;
    const commandOptions = command.split(' ');
    let lsresult = '';
    if (commandOptions[0] === 'ls') {
      lsresult = Object.keys(traverse.ls()).join(' ');
    } else if (commandOptions[0] === 'cd') {
      lsresult = Object.keys(traverse.cd(commandOptions[1])).join(' ');
    }
    this.setState({
      commands: [...commands, lsresult],
    }, () => {
      this.setState({
        command: '',
      });
    });

  }

  renderCommands() {
    const { commands } = this.state;
    return commands.map((el, index) => {
      // const lsresult = Object.keys(traverse.ls()).toString();

      return <Message key={index.toString()} command={el} />;
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

              <ContentEditable
                innerRef={this.contentEditable}
                html={this.state.command} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={this.handleChange} // handle innerHTML change
                tagName='span' // Use a custom HTML tag (uses a div by default)
              />



              {/* <form onSubmit={this.handleClick.bind(this)}> */}
              {/* <div className="cursor"> */}
              {/* <span ref={this.textInput} onKeyPress={this.handleOnChange.bind(this)} contentEditable="true" /> */}
              {/* <input value={command} onChange={this.handleOnChange.bind(this)} /> */}
              {/* <i /> */}
              {/* </div> */}
              {/* </form> */}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
