import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import DataSelector from './DataSelector';
import FetchErrorMessage from './FetchErrorMessage';

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

  componentDidMount () {
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
          <div className="row" style={styles.infoHolder}>

            {this.props.renderAutoCompleteForm()}
          
            <div className="col-4" style={styles.priceHolder}>

              <p className="" style={styles.infoBold}>{`${this.props.stockPrice} usd`}</p>
              <p style={styles.time}>{this.props.timeStamp}</p>
           
            </div>

          </div>}


        <div className="col-12" style={styles.graphHolder}>
          <DataSelector
            handleClick={this.props.handleSelectorClick}
            dataLength={this.props.dataLength}
          />
          {!this.props.fetchError ?
            <div>

              <AreaChart width="100%" height="300px"
                library={options}
                dataset={styles.chart}
                data={this.props.data}
                points={false}
              />
            </div>
            :
            <FetchErrorMessage />}

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
    marginLeft: '30px'
  },
  priceHolder: {
    marginTop: '28px'
  },
  infoBold: {
    fontWeight: 'bolder',
    fontSize: 20
  },
  time: {
    fontSize: '12px'
  },
  chart: {
    backgroundColor: 'rgba(255,255,255,0.5)'
  }
}

export default StockGraph;
