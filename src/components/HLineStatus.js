import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class HLineStatus extends Component {
  constructor(props) {
      super(props);
      this.state = ({lineLoading: true});
      this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.refresh, 45000);
    this.refresh();    
  }
    
  refresh() {
    this.setState({lineLoading: true});
    fetch('https://api.tfl.gov.uk/Line/'+this.props.lineId+'/Status?app_id=02674c92&app_key=b2d15afec764f37e0110484a3d718df2')
      .then((response) => response.json())
      .then((responseJson) => {
      
      this.setState({
        lineLoading: false,
        lineStatus: (responseJson[0].lineStatuses[0]),});
      })
      .catch((error) =>{
        console.error(error);
    });
  }
  
  render() {
    if (this.state.lineLoading) {
      return (<div className="h-header-full" />)
    }
    return (
      <div className="h-header-full">
        <FontAwesome name='train'
        style={{ marginRight: '8px'}}
        />  
        {this.props.lineId} Line - {this.state.lineStatus.statusSeverityDescription}
        <div className="h-status-desc">{this.state.lineStatus.reason}</div>
      </div>
    );
  }
}

