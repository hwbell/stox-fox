import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components 
import { Button } from 'reactstrap';

// define heading categories
// business entertainment general health science politics sports technology

// these will be the for the full range of the data, if it is available
// for many, it isnt. so chop off the ones we dont need below
let fullSelectors = ['today', 'week', 'month', 'year', 'full'];

export default class DataSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectors: [],
      dataLength: this.props.dataLength
    };
  }

  componentDidMount() {
    this.formatSelectors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataLength !== this.props.dataLength) {
      this.setState({
        dataLength: nextProps.dataLength
      }, () => {
        this.formatSelectors();
      });
    }
    
  }

  // get rid of selectors that don't apply
  formatSelectors() {
    let length = this.props.dataLength;
    console.log('formatting selectors')
    console.log(`dataLength: ${length}`)
    let selectors;
    if (length < 30) {
      selectors = ['today', 'week', 'full']
    } else if (length < 365) {
      selectors = ['today', 'week', 'month', 'full']
    } else {
      selectors = fullSelectors; 
    }

    if (this.props.noIntraday) {
      selectors = selectors.slice(1);
    }
    this.setState({selectors});

  }

  render() {
    return (
      <div className="text-center row" style={styles.container}>
        {this.state.selectors &&
          this.state.selectors.map((type, i) => {
            return (
              <Button key={i} className="col padding-0 data-selector"
                color="link"
                onClick={() => this.props.handleClick(type)}>
                {type}
              </Button>
            )
          })}
      </div>
    );
  }
}

const styles = {
  container: {
    width: '80%',
    margin: '1vh auto'
  },
  button: {
    fontSize: 16
  }
}