import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components 
import { Button } from 'reactstrap';

// define heading categories
// business entertainment general health science politics sports technology

export default class DataSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }
  render() {
    return (
      <div className="text-center row" style={styles.container}>
        {this.props.dataTypes.map( (type, i) => {
          return (
            <Button key={i} className="col padding-0"
              style={styles.button}
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