import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components 
import { Button } from 'reactstrap';
import { NavLink } from "react-router-dom";

// define heading categories
// business entertainment general health science politics sports technology
const headings = [
  {
    text: 'stock',
    route: '/'
  },
  {
    text: 'forex',
    route: '/forex/'
  },
  {
    text: 'crypto',
    route: '/crypto/'
  },
  {
    text: 'sectors',
    route: '/sector/'
  },

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
      <div className="fixed-top" style={styles.container}>
        <div className="row">

          <div className="col-12 col-sm-6">
            <div className="text-center row">

              <div className="col">
                <p className="" style={styles.title} >$toxFox</p>
              </div>

              <div className="col">
                <i className="fab fa-wolf-pack-battalion orange-gradient" style={styles.icon}></i>
              </div>

            </div>
          </div>

          <div className="col-12 col-sm-6" style={styles.linkHolder}>
            <div className="text-center row">
              {
                headings.map((heading, i) => {
                  return (

                    <NavLink key={i} className="col padding-0 nav-link" style={styles.link}
                      to={heading.route}>
                      <p>{heading.text}</p>
                    </NavLink>
                    
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
    // border: '1px solid',
    // height: '50px'
    // marginTop: '2vh',

    // backgroundColor: 'rgba(255,255,255,0.9)'
  },
  title: {
    paddingTop: '1vh',
    // fontWeight: 'lighter',
    fontSize: 32,
  },
  icon: {
    paddingTop: '1vh',
    fontSize: 40,
  },
  linkHolder: {
    paddingRight: '5vw',
    paddingTop: '1vh'
  },
  link: {
    paddingRight: '2vh',
    fontFamily: 'inherit',
    fontWeight: '600',
    fontSize: 'calc(0.4vw + 18px)',
  }
}