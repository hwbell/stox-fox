import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// for media queries
import Media from 'react-media';

// components 
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
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
      dropdownOpen: false
    };
    this.renderLinks = this.renderLinks.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  renderLinks() {
    return (
      <div className="col-8 col-sm-6" style={styles.linkHolder}>
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
    )
  }

  renderDropDown() {
    return (
      <div className="col" style={styles.dropDownMenu}>
        <Dropdown className="float-right"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}>

          <DropdownToggle color="link" className="dropdown-link">
            <i style={styles.dropDownIcon} className="dropdown fas fa-align-justify"></i>
          </DropdownToggle>
          <DropdownMenu>

            {headings.map((heading, i) => {

              return (
                <DropdownItem key={i}>
                  <NavLink className="nav-link"
                    to={heading.route}>
                    <p style={styles.link}>{heading.text}</p>
                  </NavLink>
                </DropdownItem>
              )
            })}

          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    return (
      <div className="fixed-top" style={styles.container}>
        <div className="row">

          <div className="col-6" style={styles.titleHolder}>
            <div className="text-center row">

              <div className="col">
                <p className="" style={styles.title} >$toxFox</p>
              </div>

              <div className="col">
                <i className="fab fa-wolf-pack-battalion orange-gradient" style={styles.icon}></i>
              </div>

            </div>
          </div>

          <Media query="(max-width: 599px)">
            {matches =>
              matches ? (
                this.renderDropDown()
              ) : (
                  this.renderLinks()
                )
            }
          </Media>

        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    // border: '1px solid',
    // height: '50px'
    paddingTop: '2vh',
    minWidth: '350px'

    // backgroundColor: 'rgba(255,255,255,0.9)'
  },
  titleHolder: {
    minWidth: '250px'
  },
  title: {
    padding: '1vw',
    paddingLeft: '20px',
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
  },
  dropDownIcon: {
    fontSize: 'calc(32px + 1vw)',
    paddingRight: '10px'
    // color: 'rgb(7, 100, 206)'
  },
  dropDownMenu: {
    marginRight: '4vw'
  },
}