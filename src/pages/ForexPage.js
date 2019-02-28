import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components

// modules
import Autocomplete from 'react-autocomplete';
// currencies info
import physicalCurrencies from '../assets/data/physicalCurrencies';
import cryptoCurrencies from '../assets/data/cryptoCurrencies';

// make into objects for the autocomplete tool
const getObjFromCurrencyArray = (currencyArray) => {
  // console.log(currencyArray)
  const currencyObjs = currencyArray.map((currency) => {
    let obj = {};
    let code = currency[0];
    let name = currency[1];

    obj['label'] = `${name} (${code})`;
    obj['code'] = code;
    return obj;
  })
  console.log(currencyObjs)

  // get rid of the first item which is just {currency: name}
  return currencyObjs.slice(1);
}

const physicals = getObjFromCurrencyArray(physicalCurrencies);
const cryptos = getObjFromCurrencyArray(cryptoCurrencies);

// modules
const alpha = require('alphavantage')({ key: process.env.alphaKey });

class ForexPage extends Component {

  constructor(props) {
    super(props);

    this.chart = this.chart.bind(this);
    this.getForexData = this.getForexData.bind(this);

    this.state = {
      data: {},
      lastRefreshed: '',
      fromValue: '',
      toValue: ''
    }
  }

  componentDidMount() {
    // this.getForexData();
  }

  chart() {
    // chart(this.state.data)
  }

  getForexData() {
    // get the data
    alpha.performance.sector().then(res => {
      console.log(res);
      let lastRefreshed = res["Meta Data"]["Last Refreshed"];
      let displayTime = lastRefreshed.slice(0, lastRefreshed.indexOf('T') + 1)

      this.setState({
        data: res,
        lastRefreshed: displayTime
      })
    });
  }

  render() {

    return (
      <div className="row" style={styles.searchHolder}>

        <div className="col">
          <div className="row padding-0">
            <p className="col padding-0">from</p>
            <Autocomplete
              items={physicals}

              shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.label}
              renderItem={(item, highlighted) =>
                <div
                  key={item.label}
                  style={{
                    borderRadius: 10,
                    backgroundColor: highlighted ? '#eee' : 'white'
                  }}
                >
                  {item.label}
                </div>
              }
              menuStyle={styles.menuStyle}
              value={this.state.fromValue}
              onChange={e => this.setState({ fromValue: e.target.value })}
              onSelect={value => this.setState({ fromValue: value })}
            />
          </div>
        </div>


        <div className="col">

          <div className="row padding-0">
            <p className="col padding-0">to</p>
            <Autocomplete
              items={physicals}

              shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.label}
              renderItem={(item, highlighted) =>
                <div
                  key={item.label}
                  style={{
                    borderRadius: 10,
                    backgroundColor: highlighted ? '#eee' : 'white'
                  }}
                >
                  {item.label}
                </div>
              }
              menuStyle={styles.menuStyle}
              value={this.state.toValue}
              onChange={e => this.setState({ toValue: e.target.value })}
              onSelect={value => this.setState({ toValue: value })}
            />
          </div>
        </div>


      </div>
    );
  }
}

const styles = {
  searchHolder: {
    width: '70%',
    margin: 'auto auto'
  },
  menuStyle: {
    // borderRadius: '35px',

    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    textAlign: 'left',
    fontSize: 12,
    height: '30vh',
    width: '15vh',
    overflow: 'auto',
    maxHeight: '50%',
  }
}

export default ForexPage;
