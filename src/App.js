import React, { Component } from 'react';
import './App.css';
import HRow from './row.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({busLoading: true, lineLoading: true});
    this.refresh = this.refresh.bind(this);
  }

 refresh() {
  this.setState({busLoading: true, lineLoading: true});
  fetch('https://api.tfl.gov.uk/Line/jubilee/Status')
    .then((response) => response.json())
    .then((responseJson) => {
    
    this.setState({
      lineLoading: false,
      lineStatus: (responseJson[0].lineStatuses[0]),});
    })
    .catch((error) =>{
      console.error(error);
    });

  fetch('https://api.tfl.gov.uk/StopPoint/490013840R/Arrivals')
    .then((response) => response.json())
    .then((responseJson) => {
      responseJson.sort(function(a, b) {
        return a.timeToStation > b.timeToStation
      });

      this.setState({
        busLoading: false,
        busStatus: (responseJson),});
    })
    .catch((error) =>{
      console.error(error);
    });
 }

  componentDidMount(){
  this.interval = setInterval(this.refresh, 45000);
  this.refresh();    
  }

  render() {
    if(this.state.lineLoading || this.state.busLoading) {
      return(<div>LOADING</div>);
    }
    var busTimes = this.state.busStatus.map(bus => {
        return <HRow
        busRoute={bus.lineId}
        busDestination="North Greenwich"
        timeToArrival={Math.round(bus.timeToStation / 60)}
      />
    });
    return (
      <div className="App">
        <div className="h-header">
          Jubilee Line - {this.state.lineStatus.statusSeverityDescription}
          <div className="h-status-desc">{this.state.lineStatus.reason}</div>
        </div>
        <div className="h-card">
          {busTimes}
          
        </div>
      </div>
    );
  }
}

export default App;