import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import AutoComplete from '../components/AutoComplete';
import StockGraph from '../components/StockGraph';

// data
import Stocks from '../assets/data/nasdaq';

// make into objects for the react-autocomplete module
const getObjFromCurrencyArray = (currencyArray) => {
  const currencyObjs = currencyArray.map((currency) => {
    let obj = {};

    // this this the form specified by the module
    obj['label'] = currency;
    obj['code'] = currency;
    return obj;
  });

  return currencyObjs;
}

const stocks = getObjFromCurrencyArray(Stocks);

// 
export default class StockPage extends Component {

  constructor(props) {
    super(props);

    this.chart = this.chart.bind(this);
    // this.getStockData = this.getStockData.bind(this);
    // this.onSelect = this.onSelect.bind(this);
    this.state = {
      stock: 'MSFT',
      graphStock: 'MSFT'
    }
  }

  componentDidMount() {
    this.getStockData();
  }

  chart() {
    // chart(this.state.data)
  }

  getStockData() {
    // type will be 'intrady', 'daily', etc.

    // get the data using the npm package
    this.props.alpha.data.daily(this.state.stock)
      .then(res => {
        console.log(res);
        let data = this.formatData(res);
        let timeStamp = res["Meta Data"]["3. Last Refreshed"];

        // get the length of the data from the time series object, which is
        // the 2nd key returned from Object.keys(res)
        let resKeys = Object.keys(res);
        let dataLength = Object.keys(res[resKeys[1]]).length;
        console.log(`dataLength inside cryptopage: ${dataLength}`)
        this.setState({
          data,
          timeStamp,
          dataLength
        })
      })
      .catch((err) => {
        console.error(err)
        this.setState({ fetchError: true })
      });


    // add an intraday call to the api, but wait 5 seconds first
    setTimeout(() => {
      this.props.alpha.data.intraday(this.state.stock).then(res => {
        console.log(res);
        let intradayData = this.formatData(res);
        let intradayTimeStamp = res["Meta Data"]["3. Last Refreshed"];

        this.setState({
          intradayTimeStamp,
          intradayData,
        });

      })
      .catch((err) => {
        console.error(err)
      });
    }, 5 * 1000)


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
    let stockPrice = Number(timeSeries[timeSeriesKeys[0]]["4. close"].slice(0, 4));

    // now convert the date by date data to the form above
    timeSeriesKeys.forEach((key, i) => {

      let dataPoint = Number(timeSeries[key]["4. close"].slice(0, 4));

      // check for a new min / max
      if (dataPoint < min) {
        min = dataPoint;
      } else if (dataPoint > max) {
        max = dataPoint;
      }
      dataObj[key] = dataPoint;
    })

    this.setState({
      stockPrice,
      min,
      max
    })
    console.log(dataObj)
    return dataObj;
  }

  renderAutoCompleteForm() {
    // TODO - make elements for better reading below
    return (
      <div className="row" style={styles.searchHolder}>

        <div className="col padding-0 scroll">
          <AutoComplete
            items={stocks}
            value={this.state.stock}
            onChange={e => this.setState({ stock: e.target.value })}
            onSelect={(value) => {
              console.log(value)
              this.setState({
                stock: value,
                graphStock: value
              }, () => {
                this.getStockData();
              });
            }}
          />
        </div>

      </div>
    )

  }

  render() {

    return (
      // use two AutoComplete inputs, one for each currency.
      // see npm package react-autocomplete. I wrapped them 
      // in a custom component to make it less confusing

      <div className="container">

        {this.renderAutoCompleteForm()}

        <StockGraph
          alpha={this.props.alpha}
          stock={this.state.graphStock}
          stockPrice={this.state.stockPrice}
          data={this.state.data}
          timeStamp={this.state.timeStamp}
          dataLength={this.state.dataLength}
          intradayTimeStamp={this.state.intradayTimeStamp}
          intradayData={this.state.intradayData}
          fetchError={this.state.fetchError}
        />

      </div>
    );
  }
}

const styles = {
  searchHolder: {
    margin: '20px 0px'
  }
}

