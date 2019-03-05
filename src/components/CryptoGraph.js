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

export default class CryptoGraph extends Component {

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

  componentDidMount() {
    this.getForexDailyData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fromCurrency !== this.props.fromCurrency) {
      this.setState({
        fromCurrency: nextProps.fromCurrency
      }, () => {
        this.getForexDailyData();
      });
    }
    if (nextProps.toCurrency !== this.props.toCurrency) {
      this.setState({
        toCurrency: nextProps.toCurrency
      }, () => {
        this.getForexDailyData();
      });
    }
  }

  // unfortunately the npm package doesnt cover eveyrthing, so we just
  // do a node-fetch in this component for each format - daily, week, month


  getForexDailyData(type) {
    // type will be 'intrady', 'daily', etc.

    // default to daily and make all uppercase
    if (!type) {
      type = 'DAILY'
    } else {
      type = type.toUpperCase();
    }

    let url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_${type}&symbol=${this.props.fromCurrency}&market=${this.props.toCurrency}&apikey=${process.env.REACT_APP_ALPHA_KEY}`

    console.log(this.props.fromCurrency, this.props.toCurrency, type, url)

    // get the data
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        // console.log(res)
        let data = this.formatData(res);
        let time = new Date(res["Meta Data"]["5. Last Refreshed"]);
        this.setState({
          data,
          type,
          time
        })
      })

  }

  formatData = (data) => {
    // this formats the response data in the form specified by react-chartkick
    console.log(data)
    // see examples at https://chartkick.com/react documentation. data format is pretty simple

    let dataKeys = Object.keys(data);

    // key 0 will be metadata and key 1 will be the data list
    let timeSeries = data[dataKeys[1]];
    

    // dates / times are they keys within the time series
    let timeSeriesKeys = Object.keys(timeSeries);

    // initialize the object
    let dataObj = {};

    // initialize min and max for the data 
    let min = Number(timeSeries[timeSeriesKeys[0]]["4b. close (USD)"].slice(0, 4));
    let max = Number(timeSeries[timeSeriesKeys[0]]["4b. close (USD)"].slice(0, 4));

    // now convert the date by date data to the form above
    timeSeriesKeys.forEach((key, i) => {
      let dataPoint = Number(timeSeries[key]["4b. close (USD)"].slice(0, 4));
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
          <p style={styles.infoBold}>
            {` ${this.props.exchangeRate} ${this.props.toCurrency}`}
          </p>
          <p style={styles.time}>{this.props.timeStamp}</p>
        </div>

        {this.state.data &&
          <div className="col" style={styles.graphHolder}>
            <DataSelector />
            <AreaChart width="100%" height="20vh"
              // xtitle="time"
              ytitle="USD"
              min={this.state.min}
              max={this.state.max}
              data={this.state.data} 
              points={false}  
              />
          </div>}
      </div>
    );
  }
}

const styles = {
  fullContent: {
    marginTop: '3vh'
  },
  graphHolder: {
    // backgroundColor: 'whitesmoke'
  },
  infoHolder: {

  },
  info: {
    margin: '2vh'
  },
  infoBold: {
    fontWeight: 'bolder',
    fontSize: 20
  },
  time: {
    fontSize: '12px'
  }
}
