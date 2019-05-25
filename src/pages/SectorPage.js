import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import SectorsList from '../components/SectorsList';

class SectorPage extends Component {

  constructor(props) {
    super(props);

    this.chart = this.chart.bind(this);
    this.getSectorData = this.getSectorData.bind(this);

    this.state = {
      data: {},
      lastRefreshed: ''
    }
  }

  componentDidMount() {
    this.getSectorData();
  }

  chart() {
    // chart(this.state.data)
  }

  getSectorData() {
    // get the data
    this.props.alpha.performance.sector().then(res => {
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
      <div className="page" style={styles.container}>

        <SectorsList data={this.state.data}/>

      </div>
    );
  }
}

const styles = {
  container: {
    paddingTop: '90px'
  },
}

export default SectorPage;
