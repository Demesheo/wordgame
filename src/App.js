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
      <div className="GuessWord-letter">
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
            return <GuessWordLetter key={i} gwletter={item}/>
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
      <div className="Letter" onClick={this.props.letterClicked}>{this.props.letter}</div>
    )
  }
}

class Letters extends Component {
  constructor(props){
    super(props)
    this.state = {
      letters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    }
  }

  render(){
    return (
      <div className="All-letters">
        {
          this.state.letters.map(function(item, i){
            return <Letter key={item} letter={item} letterClicked={() => this.props.onLetterClicked(item)}/>
          }, this)
        }
      </div>
    )
  }
}

class Hangman extends Component {
  constructor(props){
    super(props)
    this.state = {
      _id: null,
      wrongs: [],
      current: [],
      correct: 0,
      result: "Guess a letter."
    }
  }

  handleClick(){
    this.setState({current: []})
    this.componentDidMount()
  }

  onLetterClicked(e){
    if(this.state.wrongs.length >= 6 || this.state.result === "You Win!") return
    var _this = this
    return fetch('http://localhost:8081/guess', {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "_id": _this.state._id,
          "letter": e
        }),
        method: "PUT",
    })
    .then(response => response.json())
    .then(function(data){
      // console.log("data", data);
      _this.setState(data);
    })
  }

  componentDidMount(){
    var newGameApi = "http://localhost:8081/newgame"
    var _this = this
    fetch(newGameApi)
      .then(response => response.json())
      .then(function(data){
        // console.log("data", data);
        _this.setState(data);
      })
  }

  render() {
    return (
      <div>
        <div>
          <GuessWord current={this.state.current}/>
          <Gallows wrongsLength={this.state.wrongs.length}/>
          <button className="NewGame-button" onClick={this.handleClick.bind(this)}>New Game</button>
        </div>
        <Letters onLetterClicked={this.onLetterClicked.bind(this)}/>
        <div className="Status">
          {this.state.result}
        </div>
      </div>
    )
  }
}

export default App;
