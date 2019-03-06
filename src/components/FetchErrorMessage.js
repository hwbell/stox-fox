import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

export default class FetchErrorMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }
  render() {
    return (
      <div className="row " style={styles.container}>
        <div className="col-12">
          <p>
            Sorry, there is no data available at this time
          </p>
          <p>
            
          </p>

        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingTop: '2vh',
  }
}