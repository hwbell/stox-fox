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
      <div className="" style={styles.container}>
          <p>
            {`Sorry, there is no time series data available at this time.`}
          </p>

          <p>
            {`Alpha Vantage's free tier only allows for 5 calls / minute.
              You probably just need to wait a few seconds and try again.`}
          </p>

          
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

}