import React, { Component } from 'react';

// modules
import { ListGroup } from 'reactstrap';

// components
import SectorListItem from './SectorListItem';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    // make below easier to read
    const data = this.props.data;

    // get the keys, which are the sectors - 'Energy', 'Industrials', 'Financials', 'Utilities', 'Consumer Discretionary', 
    //                'Consumer Staples', 'Information Technology', 'Materials', 
    //                'Communication Services', 'Real Estate', 'Health Care'
    const performanceProps = Object.keys(data);

    return (
      <div className="container">

      {/* each ListGroup contains a performance metric - real time performance 1 day performance,
      and the delta for each sector   */}
        <ListGroup>
          {
            performanceProps.map((metric, i) => {
              {/* skip the 0th index - its metadata */ }
              const sectors = Object.keys(data[metric]);
              return (
                i > 0 && 
                <SectorListItem 
                  mapKey={i}
                  data={data}
                  metric={metric}
                  sectors={sectors}
                />
              )
            })
          }
        </ListGroup>
      </div>
    );
  }
}

const styles = {
  listTitle: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  sector: {
    margin: '1vh',
    fontWeight: 550
  },
  delta: {
    // color: 'blue',
    margin: '1vh',
    fontWeight: 500
  }
}

export default Header;
