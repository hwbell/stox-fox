import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import AutoComplete from '../components/AutoComplete';
import CryptoGraph from '../components/CryptoGraph';

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

    this.chart = this.chart.bind(this);
    this.getForexData = this.getForexData.bind(this);
    // this.onSelect = this.onSelect.bind(this);
    this.state = {
      data: null,
      exchangeRate: '',
      timeStamp: '',
      fromCurrency: 'EUR',
      toCurrency: 'USD',
    }
  }

  componentDidMount() {
    this.getForexData();
  }

  chart() {
    // chart(this.state.data)
  }

  // unfortunately the npm package doesnt cover eveyrything, so we just
  // do a node-fetch in this component 

  getForexData() {

    // let intradayUrl = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${this.state.fromCurrency}&to_symbol=${this.state.toCurrency}&interval=5min&apikey=${process.env.REACT_APP_ALPHA_KEY}`
    let dailyUrl = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${this.state.fromCurrency}&to_symbol=${this.state.toCurrency}&interval=5min&apikey=${process.env.REACT_APP_ALPHA_KEY}`

    console.log(this.state.fromCurrency, this.state.toCurrency, dailyUrl)

    // get the data
    fetch(dailyUrl)
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
          dailyData: data, // the data that was fetched is named according to the selector,
          // ex - 'intraday' selector is saved as this.state.intradayData
          data, // the data that gets displayed, gets modified by buttons
          timeStamp,
          dataLength
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
    let firstDataPoint = Number(timeSeries[timeSeriesKeys[0]]["4. close"]);
    let min = firstDataPoint;
    let max = firstDataPoint;
    let exchangeRate = firstDataPoint;
    // now convert the date by date data to the form above

    timeSeriesKeys.forEach((key, i) => {
      // get the dataPoint
      let dataPoint = Number(timeSeries[key]["4. close"]);

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
      max,
      exchangeRate
    })
    console.log(dataObj)
    return dataObj;
  }

  renderAutoCompleteForms() {
    // TODO - make elements for better reading below
    return (
      <div className="row" style={styles.searchHolder}>

        <div className="col-4 padding-0">
          <AutoComplete
            items={physicals}
            open={false}
            value={this.state.fromCurrency}
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

        <div className="col-4" style={{textAlign: 'center' }}>
          <i className="fas fa-random" style={{marginTop: '12px'}}></i>
        </div>

        <div className="col-4 padding-0">
          <AutoComplete
            items={physicals}
            value={this.state.toCurrency}
            onChange={e => this.setState({ toCurrency: e.target.value })}
            onSelect={(value) => {
              console.log(value)
              this.setState({
                toCurrency: value,
                graphToCurrency: value,
              }, () => {
                this.getForexData();
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

        {this.renderAutoCompleteForms()}

        {this.state.data &&
          <div className="">
            <CryptoGraph
              data={this.state.data}
              alpha={this.props.alpha}
              fromCurrency={this.state.fromCurrency}
              toCurrency={this.state.toCurrency}
              exchangeRate={this.state.exchangeRate}
              timeStamp={this.state.timeStamp}
              min={this.state.min}
              max={this.state.max}
              dataLength={this.state.dataLength}
              fetchError={this.state.fetchError}
            />
          </div>}
      </div>
    );
  }
}

const styles = {
  searchHolder: {
    width: '200px',
    margin: '3vh auto'
  },
  icon: {
    // border: '1px solid black',
    marginTop: '0.5vh',
    color: 'black',
    fontSize: 15,
  }
}
