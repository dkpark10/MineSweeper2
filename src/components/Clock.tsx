import React from 'react';


export default class Clock extends React.Component<any, any>{

  private timerId: any;

  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({date: new Date()})
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  public render() {
    return (
      <>
        <div>{this.state.date.toLocaleTimeString()}</div>
      </>
    )
  }
}