import React, { Component } from 'react';

// modules
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup } from 'reactstrap';

// components
import SectorListItem from './SectorListItem';

// for the dropDown links, great package
import AnchorLink from 'react-anchor-link-smooth-scroll'


// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  componentDidMount() {

  }

  renderDropDownMenu(metrics) {

    // toss the first - just says "Meta Data"
    metrics = metrics.slice(1);

    return (
      <Dropdown className="float-right"
        style={styles.dropdown}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}>

        <DropdownToggle color="link" className="dropdown-link" style={styles.link}>
          time series <i className="fas fa-sort-down"></i>
        </DropdownToggle>
        <DropdownMenu>

          {metrics.map((metric, i) => {

            // get the index to chop the metric title @ the word 'Performance'
            let sliceInd = metric.indexOf('Performance');
            let linkTitle = metric.slice(7, sliceInd);

            let linkTarget = '#' + metric.replace(/\W/g, '').toLowerCase();
            {/* console.log(linkTitle, linkTarget) */ }
            return (
              <DropdownItem key={i}>
                <AnchorLink offset={() => 115} style={styles.link} href={linkTarget} className="dropdown-link">{linkTitle}</AnchorLink>
              </DropdownItem>
            )
          })}

        </DropdownMenu>
      </Dropdown>
    )
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    // make below easier to read
    const data = this.props.data;

    // get the keys, which are the metrics - 

    const performanceProps = Object.keys(data);
    // console.log(performanceProps)

    return (

      <div style={styles.container}>

        {this.renderDropDownMenu(performanceProps)}

        {/* each ListGroup contains a performance metric - real time performance 1 day performance,
      and the delta for each sector   */}
        <ListGroup>
          {
            performanceProps.map((metric, i) => {
              {/* skip the 0th index - its metadata */ }
              const sectors = Object.keys(data[metric]);
              return (
                i > 0 &&
                <SectorListItem
                  key={i}
                  mapKey={i}
                  data={data}
                  metric={metric}
                  sectors={sectors}
                />
              )
            })
          }
        </ListGroup>

      </div>
    );
  }
}

const styles = {
  container: {
    // marginTop: '8vh',
    marginBottom: '8vh',
    zIndex: 1,
  },
  dropdown: {
    position: 'fixed',
    top: '120px',
    right: '40px',
    zIndex: 2,
    backgroundColor: 'whitesmoke',
    borderRadius: '4px',
  },
  link: {
    padding: '4px 8px',
    fontFamily: 'inherit',
    fontWeight: '400',
    fontSize: '18px',
  },
  listTitle: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  sector: {
    margin: '1vh',
    fontWeight: 550
  },
  delta: {
    // color: 'blue',
    margin: '1vh',
    fontWeight: 500
  }
}

export default Header;
