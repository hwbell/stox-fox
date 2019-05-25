import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components 
import { Button } from 'reactstrap';

// define heading categories
// business entertainment general health science politics sports technology
const headings = [
  'stock',
  'forex',
  'crypto',
  'sector',

]

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }
  render() {
    return (
      <div className="text-center row fixed-bottom" style={styles.container}>
        
        <div className="">
          <div style={styles.linkHolder}>
            <a target="_blank" href="https://www.alphavantage.co">
              <p style={styles.text} className="nav-link">
                powered by <strong>Alpha Vantage</strong>
              </p>
            </a>
          </div>
        </div>
        
      </div>
    );
  }
}

const styles = {
  container: {
    // paddingTop: '2vh',
    padding: '0px',
    paddingLeft: '4vh',
    backgroundColor: 'rgba(25,25,25, 0.9)',
  },
  text: {
    fontSize: '20px',
    marginLeft: '20px' 
  }
  
}