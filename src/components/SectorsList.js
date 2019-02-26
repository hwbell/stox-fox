import React, { Component } from 'react';

// modules
import { ListGroup, ListGroupItem, Collapse, Button, CardBody, Card } from 'reactstrap';


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
    const performanceProps = Object.keys(data);

    return (
      <div className="container">
        <ListGroup>
          {
            performanceProps.map((metric, i) => {
              {/* skip the 0th index - its metadata */ }
              const sectors = Object.keys(data[metric]);
              return (
                i > 0 && 
                <ListGroupItem key={i}>
                  {/* get rid of the 'Rank (letter): ' 
                  the <p> below shows each performance metric*/}

                  <p style={styles.listTitle}>{metric.slice(7)}</p>
                  
                  {/* now map within each metric to show corresponding
                  performance according to the metric. show delta as red for neg
                  and blue for pos. see below style */}

                  {sectors.map((sector, i) => {
                    let delta = data[metric][sector];
                    {/* check for a - symbol */}
                    let deltaColor = delta.indexOf('-') !== -1 ? 'red' : 'blue';

                    return (
                      <div key={i} className="row">
                      {/* here we show each sector and its change */}
                        <p style={styles.sector}>{`${sector}:`}</p>
                        <p style={{margin: '1vh', color: deltaColor}}>{delta}</p>

                      </div>
                    )
                  })}

                </ListGroupItem>
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
