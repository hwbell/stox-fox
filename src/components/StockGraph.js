import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import DataSelector from './DataSelector';

// modules
import Chartkick, { AreaChart } from 'react-chartkick'
import 'chart.js'

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

    var options = {
      scales: {
        tooltips: true,
        yAxes: [
          {
            ticks: { fontSize: 14, fontColor: "#fff", fontFamily: 'Dosis' },
          }
        ],
        xAxes: [
          {
            ticks: { fontSize: 14, fontColor: "#fff", fontFamily: 'Dosis' },
          }
        ]
      },


    };


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
            library={options}
            dataset={styles.chart}
            data={this.props.data}
            points={false}
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
    // paddingTop: '25px',
    fontWeight: 'bolder',
    fontSize: '24px'
  },
  time: {
    fontSize: '14px'
  },
  chart: {
    // backgroundColor: 'none'
  }
}

export default StockGraph;
