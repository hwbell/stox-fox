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
        <div className="row" style={styles.header}>
          
          <p className="col" style={styles.title} >stoxfox</p>

          <i className="col fab fa-wolf-pack-battalion orange-gradient" style={styles.icon}></i>

          {/* <p className="col" style={styles.time} >{`updated @ ${this.props.lastRefreshed}`}</p> */}
        </div>
    );
  }
}

const styles = {
  header: {
    width: '100%',
    margin: '1vh auto 3vh auto'
  },
  time: {
    // border: '1px solid black',
    margin: '3vh 2vh',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
    minWidth: 100
  },
  title: {
    // border: '1px solid black',
    margin: '2vh',
    fontWeight: 'bold',
    fontSize: 32,
    // margin: 'auto auto',
  },
  icon: {
    // border: '1px solid black',
    margin: '2vh',
    fontSize: 40,
  }
}

export default Header;
