import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import SectorsList from '../components/SectorsList';

// modules
const alpha = require('alphavantage')({ key: process.env.alphaKey });


class SectorPage extends Component {

  constructor(props) {
    super(props);

    this.chart = this.chart.bind(this);
    this.getSectorData = this.getSectorData.bind(this);

    this.state = {
      data: {},
      lastRefreshed: ''
    }
  }

  componentDidMount() {
    this.getSectorData();
  }

  chart() {
    // chart(this.state.data)
  }

  getSectorData() {
    // get the data
    alpha.performance.sector().then(res => {
      console.log(res);
      let lastRefreshed = res["Meta Data"]["Last Refreshed"];
      let displayTime = lastRefreshed.slice(0, lastRefreshed.indexOf('T') + 1)

      this.setState({
        data: res,
        lastRefreshed: displayTime
      })
    });
  }

  render() {
    return (
      <div className="App">

        <SectorsList data={this.state.data}/>

      </div>
    );
  }
}

const styles = {
  
}

export default SectorPage;