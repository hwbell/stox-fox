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

class StockGraph extends Component {

  constructor(props) {
    super(props);
    this.handleSelectorClick = this.handleSelectorClick.bind(this);
    this.state = {
      type: 'daily',
      data: null,
      min: null,
      max: null
    }
  }
  componentWillReceiveProps(nextProps) {
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
    if (nextProps.stock !== this.props.fromCurrency) {
      this.setState({
        stock: nextProps.stock
      });
    }
    if (nextProps.stockPrice !== this.props.stockPrice) {
      this.setState({
        stockPrice: nextProps.stockPrice
      });
    }
    if (nextProps.timeStamp !== this.props.stockPtimeStamprice) {
      this.setState({
        timeStamp: nextProps.timeStamp
      });
    }
  }

  handleSelectorClick(selector) {

    // if the selector is 'today' we'll change the data set to the intradayData
    // everything else - 'week', 'month', 'year', - can be extracted from the dailyData

    if (selector === 'today') {

      this.setState({
        fetchError: !this.props.intradayData,
        data: this.props.intradayData
      })
      return; // skip the rest 
    }

    if (!this.props.dailyData) {
      this.setState({ fetchError: true })
    }
    // get the current daily data and just section out what is needed 
    // from the initial api call
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
        {this.props.stockPrice &&
          <div className="" style={styles.infoHolder}>
            <p className="" style={styles.infoBold}>{`${this.props.stockPrice} usd`}</p>

            <p style={styles.time}>{this.props.timeStamp}</p>
          </div>}


          <div className="col-12" style={styles.graphHolder}>
            <DataSelector
              handleClick={this.handleSelectorClick}
              dataLength={this.props.dataLength}
            />
            {!this.props.fetchError ?
              <div>

                <AreaChart width="100%" height="200px"
                  // xtitle="time"

                  style={styles.chart}
                  min={this.props.min}
                  max={this.props.max}
                  data={this.state.data}
                  points={false}
                />
              </div>
              :
              <FetchErrorMessage />}

          </div>

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

export default StockGraph;
