import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// components
import Header from './components/Header';
import SectorsList from './components/SectorsList';
// modules
var d3 = require("d3");
const alpha = require('alphavantage')({ key: process.env.alphaKey });


class App extends Component {

  constructor(props) {
    super(props);

    this.chart = this.chart.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      stocks: [`msft`, `aapl`],
      data: {},
      lastRefreshed: ''
    }
  }

  componentDidMount() {
    this.getData();
  }

  chart() {
    // chart(this.state.data)
  }

  getData() {
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

        <Header lastRefreshed={this.state.lastRefreshed} />

        <SectorsList data={this.state.data}/>

      </div>
    );
  }
}

const styles = {
  header: {
    margin: '3vh'
  },
  time: {
    margin: '1vh',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28
  },
  icon: {
    margin: '1vh',
    fontSize: 30,
  }
}

export default App;
