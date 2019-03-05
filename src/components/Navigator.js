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

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }
  render() {
    return (
      <div className="container" style={styles.container}>
        <div className="row">

          <div className="col-12 col-sm-6">
            <div className="row">
              <p className="col" style={styles.title} >$toxFox</p>

              <i className="col fab fa-wolf-pack-battalion orange-gradient" style={styles.icon}></i>
            </div>
          </div>

          <div className="col-12 col-sm-6" style={styles.linkHolder}>
            <div className="row">
              {
                headings.map((heading, i) => {
                  return (
                    <Button key={i}
                      color="link"
                      className="col nav-link"
                      style={styles.link}
                      onClick={() => this.props.onClick(heading)}>{heading}</Button>
                  )
                })
              }
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    // margin: '3vh',
    marginTop: '2vh'
  },
  title: {
    // border: '1px solid black',
    margin: '1.5vh',
    fontWeight: 'lighter',
    fontSize: 32,
    // margin: 'auto auto',
  },
  icon: {
    // border: '1px solid black',
    margin: '2vh',
    fontSize: 40,
  },
  linkHolder: {
    marginTop: '2vh'
  },
  link: {
    padding: '1vh',
    fontFamily: 'inherit',
    fontWeight: '650',
    fontSize: 'calc(0.4vw + 14px)',
    color: '#4527A0'
  }
}