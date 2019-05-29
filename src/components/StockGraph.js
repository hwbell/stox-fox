import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import DataSelector from './DataSelector';

// modules
import Chartkick, { AreaChart } from 'react-chartkick'

Chartkick.options = {
  backgroundColor: 'none'
}

// import 'chart.js'

class StockGraph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: 'daily',
      data: null,
    }
  }

  componentDidMount() {
    // this.handleSelectorClick('full');
  }

  render() {

    // set the min and max of the data

    return (
      <div className="" style={styles.fullContent}>

        {/* this will display for single stocks */}
        {!this.props.isExchange ?
          <div className="" style={styles.infoHolder}>

            {this.props.renderAutoCompleteForm()}

            <div className="" style={styles.priceHolder}>

              <p className="" style={styles.infoBold}>{`${this.props.stockPrice} usd`}</p>
              <p style={styles.time}>{this.props.timeStamp}</p>

            </div>

          </div> :

          // Or this will display for an exchange rate 
          <div className="" style={styles.infoHolder}>

            {this.props.renderAutoCompleteForm()}

            <div className="" style={styles.priceHolder}>
              <p style={styles.info}>
                {`1 ${this.props.fromCurrency} is equal to `}
              </p>
              <p style={styles.infoBold}>
                {` ${this.props.exchangeRate} ${this.props.toCurrency}`}
              </p>
              <p style={styles.time}>{this.props.timeStamp}</p>
            </div>

          </div>}



        <div className="" style={styles.graphHolder}>

          {/* buttons to change the data on the graph */}
          <DataSelector
            noIntraday={this.props.noIntraday}
            handleClick={this.props.handleSelectorClick}
            dataLength={this.props.dataLength}
          />

          <AreaChart width="100%" height="300px"
            data={this.props.data}
            points={false}
            // *** this is how to customize a google chart through the react-chartkick library
            // kind of elusive in the docs, will just use straight up react-google-charts next time
            library={{
              areaOpacity: 0.8,
              backgroundColor: 'none',
              // tooltip: { textStyle: { color: 'rgb(7, 100, 206)', fontName: 'Sarabun' } },
              vAxis: {
                gridlines: { color: 'none' },
                textStyle: { fontName: 'Dosis', bold: 0, fontSize: 14, color: 'white' },
              },
              hAxis: {
                textStyle: { fontName: 'Dosis', bold: 0, fontSize: 14, color: 'white' },
              },
            }}

          />

        </div>

      </div>
    );
  }
}

const styles = {
  fullContent: {
    width: '100%',
    marginBottom: '15vh'
  },
  infoHolder: {
    // border: '1px solid white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceHolder: {
    // margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoBold: {
    paddingTop: '10px',
    fontWeight: 'bolder',
    fontSize: '24px'
  },
  time: {
    fontSize: '14px'
  },
  chart: {
    backgroundColor: 'none'
  }
}

export default StockGraph;
