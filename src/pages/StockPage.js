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
    // this.getForexData();
  }

  chart() {
    // chart(this.state.data)
  }

  // getStockData() {
  //   // console.log(this.state.fromCurrency, this.state.toCurrency)
  //   // get the data
  //   this.props.alpha.forex.rate(this.state.fromCurrency, this.state.toCurrency).then(res => {
  //     // console.log(res);
  //     let timeStamp = res["Realtime Currency Exchange Rate"]["6. Last Refreshed"];
  //     let exchangeRate = res["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
  //     this.setState({
  //       exchangeRate,
  //       timeStamp,
  //     })
  //   });
  // }

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
                // this.getStockData();
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

        <div className="">
          <StockGraph
            alpha={this.props.alpha}
            stock={this.state.graphStock}
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
    fontSize: 20,
  }
}

