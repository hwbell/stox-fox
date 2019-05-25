import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import DataSelector from './DataSelector';

// modules
import { AreaChart } from 'react-chartkick'

// import Google from 'chart.js'
// ReactChartkick.addAdapter(Google);

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
        yAxes: [
          {
            ticks: { fontSize: 14, fontColor: "#fff", fontFamily: 'Josefin Sans' },
          }
        ],
        xAxes: [
          {
            ticks: { fontSize: 14, fontColor: "#fff", fontFamily: 'Josefin Sans' },
          }
        ]
      }
    };


    // set the min and max of the data

    return (
      <div className="" style={styles.fullContent}>
        {this.props.stockPrice &&
          <div className="" style={styles.infoHolder}>

            {this.props.renderAutoCompleteForm()}

            <div className="" style={styles.priceHolder}>

              <p className="" style={styles.infoBold}>{`${this.props.stockPrice} usd`}</p>
              <p style={styles.time}>{this.props.timeStamp}</p>

            </div>

          </div>}


        <div className="" style={styles.graphHolder}>
          <DataSelector
            handleClick={this.props.handleSelectorClick}
            dataLength={this.props.dataLength}
          />
          <div style={{zIndex: 3}}>

            <AreaChart width="100%" height="300px"
              library={options}
              dataset={styles.chart}
              data={this.props.data}
              points={false}
            />
          </div>

        </div>

      </div>
    );
  }
}

const styles = {
  fullContent: {

    width: '100%'
  },
  infoHolder: {
    // border: '1px solid white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'space evenly'
  },
  priceHolder: {
    margin: '10px'
  },
  infoBold: {
    paddingTop: '25px',
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
