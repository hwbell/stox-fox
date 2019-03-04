import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import AutoComplete from '../components/AutoComplete';

import Stocks from '../assets/data/nasdaq';


export default class StockPage extends Component {

  constructor(props) {
    super(props);

    this.chart = this.chart.bind(this);
    this.getStockData = this.getStockData.bind(this);
    // this.onSelect = this.onSelect.bind(this);
    this.state = {
      stock: 'MSFT',
      graphStock: ''
    }
  }

  componentDidMount() {
    // this.getForexData();
  }

  chart() {
    // chart(this.state.data)
  }

  getStockData() {
    // console.log(this.state.fromCurrency, this.state.toCurrency)
    // get the data
    this.props.alpha.forex.rate(this.state.fromCurrency, this.state.toCurrency).then(res => {
      // console.log(res);
      let timeStamp = res["Realtime Currency Exchange Rate"]["6. Last Refreshed"];
      let exchangeRate = res["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      this.setState({
        exchangeRate,
        timeStamp,
      })
    });
  }

  renderAutoCompleteForm() {
    // TODO - make elements for better reading below
    return (
      <div className="row" style={styles.searchHolder}>

        <div className="col padding-0 scroll">
          <AutoComplete
            items={Stocks}
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

