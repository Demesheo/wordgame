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


class GuessWordLetter extends Component {
  render(){
    return (
      <div>
        {this.props.gwletter}
      </div>
    )
  }
}

class GuessWord extends Component {
  render(){
    return (
      <div className="GuessWord-container">
        {
          this.props.current.map(function(item, i){
            return <GuessWordLetter key="item" gwletter="item"/>
          })
        }
      </div>
    )
  }
}

class Gallows extends Component {
  render(){
    return (
      <div className="Gallows-div">
        <img className="Gallows-img" src={require("/Hangman-"+this.props.wrongsLength+".png")} alt=""></img>
      </div>
    )
  }
}

class Letter extends Component {
  render(){
    return (
      <div className="Letter">{this.props.letter}</div>
    )
  }
}

class Letters extends Component {
  constructor(){
    super()
    this.state = {
      letters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    }
  }

  render(){
    return (
      <div className="All-letters">
        {
          this.state.letters.map(function(item, i){
            return <Letter key={item} letter={item}/>
          })
        }
      </div>
    )
  }
}

class Hangman extends Component {
  constructor(props){
    super(props)
    this.state = {
      wrongs: [],
      current: [],
      correct: 0,
      result: ""
    }
  }

  handleClick(){
    console.log("gamestate", this.state)
  }

  componentDidMount(){
    var newGameApi = "http://localhost:8081/newgame"
    var _this = this
    fetch(newGameApi)
      .then(response => response.json())
      .then(function(data){
        console.log("data", data);
        _this.setState(data);
      })
  }

  render() {
    return (
      <div>
        <div>
          <Gallows wrongsLength={this.state.wrongs.length}/>
          <button onClick={this.handleClick.bind(this)}>state</button>
        </div>
          <Letters/>
      </div>
    )
  }
}

export default App;
