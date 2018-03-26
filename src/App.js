import React, { Component } from 'react';
import './App.css';

// var api = "http://wordgameapi-env.us-east-2.elasticbeanstalk.com"


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hangman</h1>
        </header>
        <div className="Content-body">
          <Hangman/>
        </div>
      </div>
    );
  }
}

class Gallows extends Component {
  constructor(props){
    super(props)
    console.log("Gallows", this)
  }
  render(){
    return (
      <div className="Gallows-div">
        <img className="Gallows-img" src={require("/Hangman-"+this.props.stage+".png")} alt=""></img>
      </div>
    )
  }
}

class Hangman extends Component {
  constructor(props){
    super(props)
    this.state = {
      wrongs: [],
      stage: 0,
      current: [],
      correct: 0,
      result: ""
    }
  }

  componentDidMount(){
    var newGameApi = "http://localhost:8081/newgame"
    fetch(newGameApi)
      .then(response => response.json())
      .then(data => this.setState(data))
  }


  render() {
    return (
      <div>
        <div>
          <Gallows stage={this.state.stage}></Gallows>
        </div>
        <button className="Start-button" onClick={this.handleClick}>
          START
        </button>
      </div>
    )
  }
}

export default App;
