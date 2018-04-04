import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class HRow extends Component {
  render() {
    return (
      <div className="h-bus-row">
        <FontAwesome name='bus'
        style={{ marginRight: '8px'}}
        size='lg'
        />  
        <div className="h-bus-num">{this.props.busRoute}</div>{this.props.busDestination}
        <div className="floatRight">
          <div className="h-bus-num">{this.props.timeToArrival}</div>
          <div className="inline">min</div>   
        </div>                  
      </div>
    );
  }
}

