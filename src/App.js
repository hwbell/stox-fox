import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// routing
import Router from 'react-router-dom/BrowserRouter';
import { AnimatedSwitch } from 'react-router-transition';
import Route from 'react-router-dom/Route';
import { Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

// pages
import SectorPage from './pages/SectorPage';
import ForexPage from './pages/ForexPage';
import CryptoPage from './pages/CryptoPage';
import StockPage from './pages/StockPage';

// components
import Navigator from './components/Navigator';
import Footer from './components/Footer';
import DataSelector from './components/DataSelector';

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
    beforeChildren: true
  },
  exit: { opacity: 0 }
});

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
      <Router>
        <div>
          <Navigator />
          {/* <Route render={({ location }) => (
            // pose is kind of awesome! and super easy for a simple 
            // implementation like this
            <PoseGroup>

              <RoutesContainer key={location.pathname}>

                <Switch location={location}>
                  <Route exact path="/" render={(props) => <StockPage {...props} alpha={alphaKey} />} />
                  <Route path="/forex/" render={(props) => <ForexPage {...props} alpha={alphaKey} />} />
                  <Route path="/crypto/" render={(props) => <CryptoPage {...props} alpha={alphaKey} />} />
                  <Route path="/sector/" render={(props) => <SectorPage {...props} alpha={alphaKey} />} />
                </Switch>

              </RoutesContainer>

            </PoseGroup>

          )} /> */}
          <Footer/>
        </div>
      </Router>
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
