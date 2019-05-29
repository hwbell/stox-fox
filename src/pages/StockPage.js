import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import AutoComplete from '../components/AutoComplete';
import StockGraph from '../components/StockGraph';
import FetchErrorMessage from '../components/FetchErrorMessage';
import { Spinner } from 'reactstrap';
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

// state obj for when the selection changes
const loadingState = {
  data: null,
  graphData: null
}

// 
export default class StockPage extends Component {

  constructor(props) {
    super(props);

    this.renderAutoCompleteForm = this.renderAutoCompleteForm.bind(this);
    this.handleSelectorClick = this.handleSelectorClick.bind(this);

    this.state = {
      stock: 'MSFT',
      graphStock: 'MSFT'
    }
  }

  componentDidMount() {
    this.getStockData();
  }

  getStockData() {
    // type will be 'intrady', 'daily', etc.
    this.setState(loadingState);

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

        console.log(res)
        // console.log(`dataLength inside cryptopage: ${dataLength}`)
        this.setState({
          data,
          graphData: data,
          timeStamp,
          dataLength,
          graphDataLength: dataLength
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
    min = Math.floor(min);

    let max = Number(timeSeries[timeSeriesKeys[0]]["4. close"].slice(0, 4));
    max = Math.floor(max);

    let stockPrice = Number(timeSeries[timeSeriesKeys[0]]["4. close"].slice(0, 4));

    // now convert the date by date data to the form above
    timeSeriesKeys.forEach((key, i) => {

      let dataPoint = Number(timeSeries[key]["4. close"].slice(0, 4));
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

  handleSelectorClick(selector) {

    // if the selector is 'today' we'll change the data set to the intradayData
    // everything else - 'week', 'month', 'year', - can be extracted from the graphData

    if (selector === 'today') {
      console.log('today')
      this.setState({
        fetchError: !this.state.intradayData,
        graphData: this.state.intradayData
      })
      return; // skip the rest 
    }

    // check data exists
    if (!this.state.graphData) {
      console.log("theres no data")
      this.setState({ fetchError: true })
    }

    // get the current daily data and just section out what is needed 
    // from the initial api call
    let graphData = JSON.parse(JSON.stringify(this.state.data));
    console.log(selector)
    // console.log(graphData)

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
      dataLength = Object.keys(graphData).length;
    }

    // now section the data accordingly
    // make a new object
    let newData = {};
    let dateKeys = Object.keys(graphData);

    // loop through the daily data using the length and assign new data
    for (let i = 0; i < dataLength; i++) {
      let key = dateKeys[i];
      newData[key] = graphData[key];
    }

    // get the new min and max of the data
    let keys = Object.keys(newData);
    let min = Math.floor(newData[keys[0]]);
    let max = Math.floor(newData[keys[0]]);

    keys.forEach((key) => {
      if (newData[key] > max) {
        max = Math.floor(newData[key]);
      }
      if (newData[key] < min) {
        min = Math.floor(newData[key]);
      }
    });

    // pad the bottom end if it doesn't force it to < 0
    min - 0.1 * min < 0 ? min = 0 : min = min - 0.1 * min;
    // pad the top end
    max = max + 0.15 * max;

    this.setState({
      graphData: newData,
      graphDataLength: dataLength,
      min,
      max
    })

    console.log(newData)

  }

  render() {

    return (
      // use two AutoComplete inputs, one for each currency.
      // see npm package react-autocomplete. I wrapped them 
      // in a custom component to make it less confusing

      <div className="page" style={styles.container}>

        {this.state.graphData &&
          <StockGraph
            renderAutoCompleteForm={this.renderAutoCompleteForm}
            handleSelectorClick={this.handleSelectorClick}
            alpha={this.props.alpha}
            stock={this.state.graphStock}
            stockPrice={this.state.stockPrice}
            data={this.state.graphData}
            min={this.state.min}
            max={this.state.max}
            timeStamp={this.state.timeStamp}
            dataLength={this.state.dataLength}
            graphDataLength={this.state.graphDataLength}
            intradayTimeStamp={this.state.intradayTimeStamp}
            intradayData={this.state.intradayData} />

        }

        {this.state.fetchError &&
          <FetchErrorMessage />
        }

      </div>
    );
  }
}

const styles = {
  container: {
    padding: 10,
    paddingTop: '90px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchHolder: {
    // margin: '20px 0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    position: 'absolute',
    top: '40%',
    left: '50%'
  }
}

