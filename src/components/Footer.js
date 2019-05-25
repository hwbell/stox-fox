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
              <p style={styles.text} className="footer-text">
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
    paddingTop: '2vh',
    paddingLeft: '4vh',
    // backgroundColor: 'rgba(239, 219, 255, 0.5)',
  },
  text: {
    fontSize: '20px',
    marginLeft: '40px' 
  }
  
}