import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import DataSelector from './DataSelector';
import FetchErrorMessage from './FetchErrorMessage';

// modules
// import LineChart from 'react-linechart';
import ReactChartkick, { LineChart, AreaChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart);

export default class CryptoGraph extends Component {

  constructor(props) {
    super(props);
    // this.getForexCurrentData = this.getForexCurrentData.bind(this);
    this.getForexData = this.getForexData.bind(this);
    this.handleSelectorClick = this.handleSelectorClick.bind(this);
    this.state = {
      fromCurrency: this.props.fromCurrency,
      toCurrency: this.props.toCurrency,
      type: 'DAILY',
      dailyData: null,
      intradayData: null,
      data: null,
      min: null,
      max: null,
      fetchError: false,
    }
  }

  componentDidMount() {
    this.getForexData(this.state.type);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fromCurrency !== this.props.fromCurrency) {
      this.setState({
        fromCurrency: nextProps.fromCurrency
      }, () => {
        this.getForexData(this.state.type);
      });
    }
    if (nextProps.toCurrency !== this.props.toCurrency) {
      this.setState({
        toCurrency: nextProps.toCurrency
      }, () => {
        this.getForexData(this.state.type);
      });
    }
  }

  handleSelectorClick(selector) {

    // get the current daily data - we wont make another api call here 
    // since there is no intraday api for crypto. Just section out 
    // of the initial api call

    let dailyData = JSON.parse(JSON.stringify(this.state.dailyData));
    // console.log(selector)
    // console.log(dailyData)

    // week, month, year, 5 year are all handled with the daily data 
    // 5 years is the returned length of the 'daily' api call,
    // so we'll make this the default

    // determine the data length based on the selector
    let dataLength;
    if (selector === 'week') {
      dataLength = 7;
    }
    else if (selector === 'month') {
      dataLength = 30;
    }
    else if (selector === 'year') {
      dataLength = 365;
    }
    // default the data length to the full daily length, 5 year
    else {
      dataLength = Object.keys(dailyData).length;
    }

    // now section the data accordingly
    // make a new object
    let newData = {};
    let dateKeys = Object.keys(dailyData);
    // loop through the daily data using the interval and assign new data
    for (let i = 0; i < dataLength; i++) {
      let key = dateKeys[i];
      newData[key] = dailyData[key];
    }

    this.setState({
      data: newData
    })

  }

  // unfortunately the npm package doesnt cover eveyrything, so we just
  // do a node-fetch in this component for each format - daily, week, month

  getForexData(type) {
    // type will be 'intrady', 'daily', etc.

    let searchType;
    // default to daily and make all uppercase for search
    if (!type) {
      searchType = 'DAILY'
    } else {
      searchType = type.toUpperCase();
    }

    let url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_${searchType}&symbol=${this.props.fromCurrency}&market=${this.props.toCurrency}&apikey=${process.env.REACT_APP_ALPHA_KEY}`

    console.log(this.props.fromCurrency, this.props.toCurrency, searchType, url)

    // get the data
    fetch(url)
      .then(this.checkStatus)
      .then(res => res.json())
      .then((res) => {
        // console.log(res)
        let data = this.formatData(res);
        let time = new Date(res["Meta Data"]["5. Last Refreshed"]);

        this.setState({
          fetchError: false,
          dailyData: data, // the data that was fetched is named according to the selector,
          // ex - 'intraday' selector is saved as this.state.intradayData
          data, // the data that gets displayed
          type,
          time
        })
      })
      .catch((err) => {
        console.error(err)
        this.setState({fetchError: true})
      });
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
      // get the dataPoint
      let dataPoint = Number(timeSeries[key]["4b. close (USD)"].slice(0, 4));

      // check for the min and max
      if (dataPoint < min) {
        min = dataPoint;
      } else if (dataPoint > max) {
        max = dataPoint;
      }
      // add it to the master object
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

        <div className="col-12 col-sm-4" style={styles.infoHolder}>
          <p style={styles.info}>
            {`1 ${this.props.fromCurrency} is equal to `}
          </p>
          <p style={styles.infoBold}>
            {` ${this.props.exchangeRate} ${this.props.toCurrency}`}
          </p>
          <p style={styles.time}>{this.props.timeStamp}</p>
        </div>

        {this.state.data &&
          <div className="col-12 col-sm-8" style={styles.graphHolder}>
            <DataSelector
              handleClick={this.handleSelectorClick}
              dataTypes={[
                'week',
                'month',
                'year',
                '5 year'
              ]}
            />
            {!this.state.fetchError ?
              <AreaChart width="100%" height="200px"
                // xtitle="time"
                ytitle="USD"
                min={this.state.min}
                max={this.state.max}
                data={this.state.data}
                points={false}
              />
              :
              <FetchErrorMessage />}


          </div>}
      </div>
    );
  }
}

const styles = {
  fullContent: {
    marginTop: '5vh'
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
