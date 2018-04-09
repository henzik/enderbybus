import React, { Component } from 'react';
import './App.css';
import FontAwesome from 'react-fontawesome';
import HLineStatus from './components/HLineStatus.js'
import HBusStatus from './components/HBusStatus.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      lineId: 'Jubilee',
      stopIds: '490013840R',
      desiredRoutes: '188,422',
      isHomebound: false,
      isWorkbound: true
    });
    this.homebound = this.homebound.bind(this);
    this.workbound = this.workbound.bind(this);
  }

  homebound() {
    this.setState({
      stopIds: '490010374B,490010374C',
      isHomebound: true,
      isWorkbound: false
    });
  }

  workbound() {
    this.setState({
      stopIds: '490013840R',
      isHomebound: false,
      isWorkbound: true
    });
  }

  render() { //490010374B
    return (
      <div className="App">
        <HLineStatus lineId={this.state.lineId}/>
        <div className='divider' />        
        <HBusStatus stopIds={this.state.stopIds}
          desiredRoutes={this.state.desiredRoutes}>
        </HBusStatus> 
        <br />
        <div className='flex-container'>
          <div className={this.state.isHomebound ? 'hBtnLeft active' : 'hBtnLeft'} onClick={this.homebound}>
          <FontAwesome name='home'
          style={{ marginRight: '8px'}}
          />  Home
          </div>
          <div className={this.state.isWorkbound ? 'hBtnRight active' : 'hBtnRight'} onClick={this.workbound}>
          <FontAwesome name='briefcase'
          style={{ marginRight: '8px'}}
          /> Work
          </div>
        </div>
      </div>
    );
  }
}

export default App;