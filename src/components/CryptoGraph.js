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
    this.handleSelectorClick = this.handleSelectorClick.bind(this);

    this.state = {
      data: this.props.data
    }
  }

  componentDidMount() {
    console.log(`data length inside cryptograph: ${this.props.dataLength}` )
  }

  // there must be better way for this...
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data
      });
    }
    if (nextProps.dailyData !== this.props.dailyData) {
      this.setState({
        dailyData: nextProps.dailyData
      });
    }
    if (nextProps.timeStamp !== this.props.timeStamp) {
      this.setState({
        timeStamp: nextProps.timeStamp
      });
    }
    if (nextProps.dataLength !== this.props.dataLength) {
      this.setState({
        dataLength: nextProps.dataLength
      });
    }
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
  }

  handleSelectorClick(selector) {
    
    // get the current daily data - we wont make another api call here 
    // since there is no intraday api for crypto. Just section out 
    // of the initial api call

    let dailyData = JSON.parse(JSON.stringify(this.props.data));
    console.log(selector)
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
      dataLength = 364;
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
      data: newData,
      dataLength
    })

    console.log('clicking')
    console.log(newData)

  }

  render() {

    return (
      <div className="" style={styles.fullContent}>

        { this.props.data && <div className="col-12" style={styles.infoHolder}>
          <p style={styles.info}>
            {`1 ${this.props.fromCurrency} is equal to `}
          </p>
          {/* dont show the rate if the fetch doesn't work */}
          {!this.props.fetchError && <p style={styles.infoBold}>
            {` ${this.props.exchangeRate} ${this.props.toCurrency}`}
          </p>}
          <p style={styles.time}>{this.props.timeStamp}</p>
        </div>}

        {/* also don't show any data if it doesn't exist yet */}
        {this.state.data &&
          <div className="col-12" style={styles.graphHolder}>

            {!this.props.fetchError ?
              <div>
                <DataSelector
                  noIntraday={true}
                  handleClick={this.handleSelectorClick}
                  dataLength={this.props.dataLength}
                />
                <AreaChart width="100%" height="200px"
                  // xtitle="time"
                  ytitle="USD"
                  min={this.props.min}
                  max={this.props.max}
                  data={this.state.data}
                  points={false}
                />
              </div>
              :
              <FetchErrorMessage />}


          </div>}
      </div>
    );
  }
}

const styles = {
  fullContent: {
    margin: '0vw'
  },
  infoHolder: {
    marginLeft: '30px'
  },
  infoBold: {
    fontWeight: 'bolder',
    fontSize: 20
  },
  time: {
    fontSize: '12px'
  }
}
