import React, { Component } from 'react';
import HRow from './HRow.js'

export default class HBusStatus extends Component {
  constructor(props) {
      super(props);
      this.state = ({
        busLoading: true,
        desiredRoutes: this.props.desiredRoutes.split(','),
        busStops: this.props.stopIds.split(','),
        busArrivals: []
      });
      this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.refresh, 45000);
    this.refresh();    
  }
    
  refresh() {
    this.setState({
      busLoading: true,
      busArrivals: []
    });
    const grabArrivals = url => fetch('https://api.tfl.gov.uk/StopPoint/'+ url +'/Arrivals?app_id=02674c92&app_key=b2d15afec764f37e0110484a3d718df2')
      .then((response) => response.json())
      .then((responseJson) => {
        var filteredJson = responseJson.filter((bus) => this.state.desiredRoutes.includes(bus.lineId));
        this.setState({ busArrivals: [...this.state.busArrivals, ...filteredJson]});
      })
      .catch((error) =>{
        console.error(error);
      });

    Promise
      .all(this.state.busStops.map(grabArrivals))
      .then(() => {
        var sortedJson = this.state.busArrivals;
        sortedJson.sort((a, b) => (a.timeToStation > b.timeToStation) ? 1 : -1);
        this.setState({
          busLoading: false,
          busArrivals: sortedJson,
        });
      });
  }

  componentDidUpdate(prevProps, prevState)
  {
    if (this.props.stopIds !== prevProps.stopIds) {
      this.setState({busStops: this.props.stopIds.split(',')}, () => { this.refresh()})
    }
  }
  
  render() {
    return (
      <div>
        <div className="h-header">
          Bus Arrivals
        </div>
        <div className="h-card">
          {this.state.busArrivals.map(element => (
          <HRow
            busRoute={element.lineId}
            busDestination={element.destinationName}
            timeToArrival={Math.floor(element.timeToStation / 60)}
          />
          ))}
        </div>       
      </div>
    );
  }
}

