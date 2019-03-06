import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// components
import Navigator from './components/Navigator';
import Footer from './components/Footer';
import DataSelector from './components/DataSelector';

// pages
import SectorPage from './pages/SectorPage';
import ForexPage from './pages/ForexPage';
import CryptoPage from './pages/CryptoPage';
import StockPage from './pages/StockPage';

// modules
// var d3 = require("d3");
console.log(process.env.ALPHA_KEY)
const alphaKey = require('alphavantage')({ key: process.env.REACT_APP_ALPHA_KEY });


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

        <Navigator lastRefreshed={this.state.lastRefreshed} />

        {/* <StockPage alpha={alphaKey}/> */}

        {/* <SectorPage alpha={alphaKey} data={this.state.data}/> */}

        {/* <ForexPage alpha={alphaKey}/> */}

        <CryptoPage alpha={alphaKey}/>
        

        <Footer />

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
