import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import AutoComplete from '../components/AutoComplete';
import StockGraph from '../components/StockGraph';
import FetchErrorMessage from '../components/FetchErrorMessage';
// currencies info
import physicalCurrencies from '../assets/data/physicalCurrencies';
import cryptoCurrencies from '../assets/data/cryptoCurrencies';

// make into objects for the react-autocomplete module
const getObjFromCurrencyArray = (currencyArray) => {
  // console.log(currencyArray)
  const currencyObjs = currencyArray.map((currency) => {
    let obj = {};
    let code = currency[0];
    let name = currency[1];

    // this this the form specified by the module
    obj['label'] = `${name} (${code})`;
    obj['code'] = code;
    return obj;
  })
  //console.log(currencyObjs)

  // get rid of the first item which is just {currency: name}
  return currencyObjs.slice(1);
}

const physicals = getObjFromCurrencyArray(physicalCurrencies);
const cryptos = getObjFromCurrencyArray(cryptoCurrencies);

export default class ForexPage extends Component {

  constructor(props) {
    super(props);

    this.getForexData = this.getForexData.bind(this);
    this.renderAutoCompleteForm = this.renderAutoCompleteForm.bind(this);
    this.handleSelectorClick = this.handleSelectorClick.bind(this);

    this.state = {
      data: null,
      exchangeRate: '',
      timeStamp: '',
      fromCurrency: 'BTC',
      toCurrency: 'USD',
    }
  }

  componentDidMount() {
    this.getForexData('daily');
  }

  // unfortunately the npm package doesnt cover everything, so we just
  // do a node-fetch in this component 

  getForexData(type) {
    // type will be always be 'daily' in this component - there isnt an intraday call for
    // crypto

    let searchType;
    // default to daily and make all uppercase for search
    if (!type) {
      searchType = 'DAILY';
    } else {
      searchType = type.toUpperCase();
    }

    let url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_${searchType}&symbol=${this.state.fromCurrency}&market=${this.state.toCurrency}&apikey=${process.env.REACT_APP_ALPHA_KEY}`

    console.log(this.state.fromCurrency, this.state.toCurrency, searchType, url)

    // get the data
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        // console.log(res)
        let data = this.formatData(res);
        let timeStamp = res["Meta Data"]["6. Last Refreshed"];
        console.log(`timeStamp: ${timeStamp}`)
        // get the length of the data from the time series object, which is
        // the 2nd key returned from Object.keys(res)
        let resKeys = Object.keys(res);
        let dataLength = Object.keys(res[resKeys[1]]).length;
        console.log(`dataLenght inside cryptopage: ${dataLength}`)

        this.setState({
          fetchError: false,
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
  }

  formatData = (data) => {
    // this formats the response data in the form specified by react-chartkick
    console.log(data)
    // see examples at https://chartkick.com/react documentation. data format is pretty simple

    // key 0 will be metadata and key 1 will be the data list
    // dates / times are they keys within the time series
    let dataKeys = Object.keys(data);
    let timeSeries = data[dataKeys[1]];
    let timeSeriesKeys = Object.keys(timeSeries);

    // initialize the object
    let dataObj = {};

    // initialize min and max for the data 
    let firstDataPoint = Number(timeSeries[timeSeriesKeys[0]]["4b. close (USD)"].slice(0, 4));
    let min = Math.floor(firstDataPoint);
    let max = Math.floor(firstDataPoint);
    
    let exchangeRate = Number(timeSeries[timeSeriesKeys[0]]["4b. close (USD)"].slice(0, 4));
    // now convert the date by date data to the form above

    timeSeriesKeys.forEach((key, i) => {
      // get the dataPoint
      let dataPoint = Number(timeSeries[key]["4b. close (USD)"].slice(0, 4));

      // check for a new min and max
      if (dataPoint < min) {
        min = Math.floor(dataPoint);
      } else if (dataPoint > max) {
        max = Math.floor(dataPoint);
      }
      // add it to the master object
      dataObj[key] = dataPoint;
    })

    this.setState({
      min,
      max,
      exchangeRate
    })
    console.log(dataObj)
    return dataObj;
  }

  renderAutoCompleteForm() {
    // TODO - make elements for better reading below

    const { fromCurrency, toCurrency } = this.state;
    return (
      <div className="row" style={styles.searchHolder}>

        <div className="col">
          <AutoComplete

            items={cryptos}
            open={false}
            value={fromCurrency}
            onChange={e => this.setState({ fromCurrency: e.target.value })}
            onSelect={(value) => {
              this.setState({
                fromCurrency: value,
              }, () => {
                this.getForexData();
              });
            }}
          />
        </div>

        <div className="col" style={{ textAlign: 'center' }}>
          <i className="fas fa-arrow-right" style={{ marginTop: '12px' }}></i>
        </div>

        <div className="col">
          <AutoComplete
            items={[{ label: 'United States Dollar', code: 'USD' }]}
            value={toCurrency}
          // Keeping this on USD at the moment as the others aren't actually reliable

          // onChange={e => this.setState({ toCurrency: e.target.value })}
          // onSelect={(value) => {
          //   console.log(value)
          //   this.setState({
          //     toCurrency: value,
          //     graphToCurrency: value,
          //   }, () => {
          //     this.getForexData();
          //   });
          // }}
          />
        </div>

      </div>
    )

  }


  handleSelectorClick(selector) {

    // if the selector is 'today' we'll change the data set to the intradayData
    // everything else - 'week', 'month', 'year', - can be extracted from the graphData

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
            noIntraday={true}
            isExchange={true}
            data={this.state.graphData}
            alpha={this.props.alpha}
            fromCurrency={this.state.fromCurrency}
            toCurrency={this.state.toCurrency}
            exchangeRate={this.state.exchangeRate}
            timeStamp={this.state.timeStamp}
            min={this.state.min}
            max={this.state.max}
            dataLength={this.state.dataLength}
            graphDataLength={this.state.graphDataLength}
            renderAutoCompleteForm={this.renderAutoCompleteForm}
            handleSelectorClick={this.handleSelectorClick}
          />}

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
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchHolder: {
    margin: '20px 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    position: 'absolute',
    top: '40%',
    left: '50%'
  }
}
