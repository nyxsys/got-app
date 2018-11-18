import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Bio from './Bio.js'



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Bio></Bio>
        </header>
      </div>
    );
  }
}

export default App;
