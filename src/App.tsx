import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

interface State {
  user : string
};

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state: State = {
      user: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/')
      .then(response => {
        console.log(response);
        this.setState({ user: response.data.id })
      })
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <h1> {this.state.user} </h1>
    )
  }
}
