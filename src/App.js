import React, { Component } from 'react';
import './App.css';

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

class Hangman extends Component {
  handleClick() {
    console.log("button clicked")
  }

  render() {
    return (
      <div>
        <div>
          <p>Click below to begin a new game!</p>
        </div>
        <button className="Start-button" onClick={this.handleClick}>
          START
        </button>
      </div>
    )
  }
}

export default App;
