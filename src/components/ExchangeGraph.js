import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import DataSelector from './DataSelector';

// modules
// import LineChart from 'react-linechart';
import ReactChartkick, { LineChart, AreaChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart);

class ExchangeGraph extends Component {

  constructor(props) {
    super(props);
    // this.getForexCurrentData = this.getForexCurrentData.bind(this);
    this.getForexDailyData = this.getForexDailyData.bind(this);
    
    this.state = {
      fromCurrency: this.props.fromCurrency,
      toCurrency: this.props.toCurrency,
      type: 'daily',
      data: null,
      min: null,
      max: null
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.fromCurrency !== this.props.fromCurrency) {
      this.setState({
        fromCurrency: nextProps.fromCurrency
      });
    }
    if (nextProps.toCurrency !== this.props.toCurrency) {
      this.setState({
        toCurrency: nextProps.toCurrency
      });
    }
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data
      });
    }
    if (nextProps.intradayData !== this.props.intradayData) {
      this.setState({
        intradayData: nextProps.intradayData
      });
    }
    if (nextProps.dataLength !== this.props.dataLength) {
      this.setState({
        dataLength: nextProps.dataLength
      });
    }
    
    if (nextProps.timeStamp !== this.props.stockPtimeStamprice) {
      this.setState({
        timeStamp: nextProps.timeStamp
      });
    }
    
  }

  formatData = (data) => {
    // this formats the response data in the form specified by react-chartkick

    // see examples at https://chartkick.com/react documentation. data format is pretty simple

    let dataKeys = Object.keys(data);

    // key 0 will be metadata and key 1 will be the data list
    let timeSeries = data[dataKeys[1]];
    // dates / times are they keys within the time series
    let timeSeriesKeys = Object.keys(timeSeries);

    // initialize the object
    let dataObj = {};

    // initialize min and max for the data 
    let min = Number(timeSeries[timeSeriesKeys[0]]["4. close"].slice(0, 4));
    let max = Number(timeSeries[timeSeriesKeys[0]]["4. close"].slice(0, 4));

    // now convert the date by date data to the form above
    timeSeriesKeys.forEach((key, i) => {
      let dataPoint = Number(timeSeries[key]["4. close"].slice(0, 4));
      if (dataPoint < min) {
        min = dataPoint;
      } else if (dataPoint > max) {
        max = dataPoint;
      }
      dataObj[key] = dataPoint;
    })

    this.setState({
      min,
      max
    })
    console.log(dataObj)
    return dataObj;
  }

  render() {

    return (
      <div className="row" style={styles.fullContent}>

        <div className="col" style={styles.infoHolder}>
          <p style={styles.info}>
            {`One ${this.props.fromCurrency} is equal to `}
          </p>
          <p style={styles.info}>
            {` ${this.props.exchangeRate} ${this.props.toCurrency}`}
          </p>
          <p style={styles.info}>{this.props.timeStamp}</p>
        </div>

        {this.state.data &&
          <div className="col" style={styles.graphHolder}>
            <DataSelector />
            <AreaChart width="100%" height="20vh"
              xtitle="time"
              ytitle={this.props.toCurrency}
              style={styles.chart}
              min={this.state.min}
              max={this.state.max}
              data={this.state.data} 
              points={false} />
          </div>}
      </div>
    );
  }
}

const styles = {
  fullContent: {

  },
  infoHolder: {

  },
  info: {
    margin: '2vh'
  },
  
}

export default ExchangeGraph;
