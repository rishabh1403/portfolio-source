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
  componentDidMount(){
    this.contentEditable.current.focus();
    setInterval(()=>{
      
      this.contentEditable.current.focus();
    },1000)
    console.log(this.contentEditable);
  }
  handleChange = evt => {
    console.log(evt);
    if (/<br>/.test(evt.target.value)) {
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
    // const { command } = this.state;
    return (
      <div className="App">
        {this.renderCommands()}
        <div>
          <div>
            <span className="shell"><b>$ ></b></span>

              <ContentEditable
              className="test"
              innerRef={this.contentEditable}
              html={this.state.command} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='span' // Use a custom HTML tag (uses a div by default)
            />
            <div className="cursor"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
