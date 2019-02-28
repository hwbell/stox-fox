import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// components
import Header from './components/Header';

// pages
import SectorPage from './pages/SectorPage';
import ForexPage from './pages/ForexPage';
import CryptoPage from './pages/CryptoPage';
import StockPage from './pages/StockPage';

// modules
// var d3 = require("d3");
// const alpha = require('alphavantage')({ key: 'FNJQW0Q6VHXXE9OS' });


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stocks: [`msft`, `aapl`],
      data: {},
      lastRefreshed: ''
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">

        <Header lastRefreshed={this.state.lastRefreshed} />

        {/* <SectorPage data={this.state.data}/> */}

        <ForexPage />
        

      </div>
    );
  }
}

// const styles = {
//   header: {
//     margin: '3vh'
//   },
//   time: {
//     margin: '1vh',
//     fontWeight: 'bold',
//     fontSize: 12,
//     textAlign: 'left',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 28
//   },
//   icon: {
//     margin: '1vh',
//     fontSize: 30,
//   }
// }

export default App;
