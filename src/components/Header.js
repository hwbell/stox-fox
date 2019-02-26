import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //
    }
  }

  componentDidMount() {
    //
  }

  render() {
    return (
      <div className="container">
        <div className="text-center row" style={styles.header}>
          <p className="col" style={styles.time} >{`updated @ ${this.props.lastRefreshed}`}</p>
          <p className="col" style={styles.title} >stoxfox</p>
          <i className="col fab fa-wolf-pack-battalion orange-gradient" style={styles.icon}></i>
        </div>
      </div>
    );
  }
}

const styles = {
  header: {
    width: '100%',
    margin: '3vh'
  },
  time: {
    margin: '2vh',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
    minWidth: 100
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    // margin: 'auto auto',
  },
  icon: {
    margin: '1vh',
    fontSize: 30,
  }
}

export default Header;
