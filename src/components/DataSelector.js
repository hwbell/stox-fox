import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components 
import { Button } from 'reactstrap';

// define heading categories
// business entertainment general health science politics sports technology
const dataTypes = [
  'today',
  'daily',
  'month',
  'year',
]

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
        {dataTypes.map( (type) => {
          return (
            <Button className="col padding-0"
              color="link"
              onClick={this.props.onClick}>
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
    width: '280px',
    margin: '1vh auto'
  }
}