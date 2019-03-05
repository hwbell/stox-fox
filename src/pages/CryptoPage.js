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
      data: {},
      exchangeRate: '',
      timeStamp: '',
      fromCurrency: 'BTC',
      toCurrency: 'USD',
      graphFromCurrency: 'BTC',
      graphToCurrency: 'USD'
    }
  }

  componentDidMount() {
    this.getForexData();
  }

  chart() {
    // chart(this.state.data)
  }

  getForexData() {
    // console.log(this.state.fromCurrency, this.state.toCurrency)
    // get the data
    this.props.alpha.forex.rate(this.state.fromCurrency, this.state.toCurrency).then(res => {
      // console.log(res);
      let timeStamp = res["Realtime Currency Exchange Rate"]["6. Last Refreshed"];
      let exchangeRate = res["Realtime Currency Exchange Rate"]["5. Exchange Rate"].slice(0,4);
      this.setState({
        exchangeRate,
        timeStamp,
      })
    });
  }

  renderAutoCompleteForms() {
    // TODO - make elements for better reading below
    return (
      <div className="row" style={styles.searchHolder}>

        <div className="col padding-0 scroll">
          <AutoComplete
            items={cryptos}
            open={false}
            value={this.state.fromCurrency}
            onChange={e => this.setState({ fromCurrency: e.target.value })}
            onSelect={(value) => {
              this.setState({
                fromCurrency: value,
                graphFromCurrency: value
              }, () => {
                this.getForexData();
              });
            }}
          />
        </div>
        <div className="col padding-0 ">
          <i className="fas fa-random" style={styles.icon}></i>
        </div>
        <div className="col padding-0 scroll">
          <AutoComplete
            items={[{label: 'United States Dollar', code: 'USD'}]}
            value={this.state.toCurrency}
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

  render() {

    return (
      // use two AutoComplete inputs, one for each currency.
      // see npm package react-autocomplete. I wrapped them 
      // in a custom component to make it less confusing

      <div className="container">

        {this.renderAutoCompleteForms()}

        <div className="">
          <CryptoGraph
            alpha={this.props.alpha}
            fromCurrency={this.state.graphFromCurrency}
            toCurrency={this.state.graphToCurrency}
            exchangeRate={this.state.exchangeRate}
            timeStamp={this.state.timeStamp}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  searchHolder: {
    width: '250px',
    margin: '3vh auto'
  },
  icon: {
    // border: '1px solid black',
    // margin: '2vh',
    color: 'black',
    fontSize: 15,
  }
}
