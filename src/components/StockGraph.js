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
import { isNull } from 'util';

ReactChartkick.addAdapter(Chart);

class StockGraph extends Component {

  constructor(props) {
    super(props);
    // this.getForexCurrentData = this.getForexCurrentData.bind(this);
    this.getStockData = this.getStockData.bind(this);

    this.state = {
      type: 'daily',
      data: null,
      min: null,
      max: null
    }
  }

  componentDidMount() {
    this.getStockData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stock !== this.props.stock) {
      this.setState({
        stock: nextProps.stock
      }, () => {
        this.getStockData();
      });
    }

  }


  getStockData(type) {
    // type will be 'intrady', 'daily', etc.

    // get the data using the npm package
    this.props.alpha.data.daily(this.props.stock).then(res => {
      console.log(res);
      let data = this.formatData(res);
      let timeStamp = res["Meta Data"]["3. Last Refreshed"];
      this.setState({
        data,
        timeStamp,
      })
    });

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
      // set the current stockPrice to the first item in the array
      if (i === 0) {
        this.setState({ stockPrice: dataPoint })
      }
      // check for a new min / max
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
            {`The current share price for ${this.props.stock} is `}
          </p>
          <p style={styles.infoBold}>{`${this.state.stockPrice}$`}</p>
          <p style={styles.time}>{this.state.timeStamp}</p>
        </div>

        {this.state.data &&
          <div className="col" style={styles.graphHolder}>
            <DataSelector />
            <AreaChart width="100%" height="20vh"
              xtitle="time"
              ytitle="price"
              style={styles.chart}
              min={this.state.min}
              max={this.state.max}
              data={this.state.data} />
          </div>}
      </div>
    );
  }
}

const styles = {
  fullContent: {
    margin: '5vh'
  },
  infoHolder: {

  },
  info: {
    // margin: '2vh'
    textAlign: 'left'
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
