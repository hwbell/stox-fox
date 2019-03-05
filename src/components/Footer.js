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
      <div className="row fixed-bottom" style={styles.container}>
        <div className="col-12">
          <a target="_blank" href="https://www.alphavantage.co">
            <p>
              powered by <strong>Alpha Vantage</strong>
            </p>
          </a>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingTop: '2vh',
    backgroundColor: 'rgba( 255, 240, 223, 0.9)'
  }
}