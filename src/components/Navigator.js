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

          <DropdownToggle color="link" className="nav-link">
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


        <div style={styles.titleHolder}>
          <p style={styles.title} >Market Monitor</p>

          <Media query="(max-width: 499px)">
            {matches =>
              matches ? (
                null
              ) : (
                <img className="logo" src={require('../assets/logo.png')} alt="logo"></img>
                )
            }
          </Media>
        </div>


        <Media query="(max-width: 699px)">
          {matches =>
            matches ? (
              this.renderDropDown()
            ) : (
                this.renderLinks()
              )
          }
        </Media>

      </div>
    );
  }
}

const styles = {
  container: {
    height: '70px',
    // paddingTop: '2vh',
    minWidth: '350px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(25,25,25,0.9)'
  },
  titleHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    marginLeft: '20px',
    marginTop: '5px',
    fontSize: '28px',
    color: 'whitesmoke'
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