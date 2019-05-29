import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// modules
import Autocomplete from 'react-autocomplete';

class AutoComplete extends Component {

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
        <Autocomplete 
          inputProps={{ className: 'autocomplete-selector', style: styles.searchInput }}
          items={this.props.items}
          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.code}
          renderItem={(item, highlighted) =>
            <div className="text-center"
              key={item.code}
              // style={{
              //   bacgroundColor: highlighted ? 'rgb(0,0,0,0.7)' : 'none'
              // }}
            >
              <p style={{fontSize: '14px', color: 'rgba(53, 100, 253, 0.842)'}} className="autocomplete-item">{item.code}</p>
            </div>
          }
          menuStyle={styles.menuStyle}
          value={this.props.value}
          onChange={this.props.onChange}
          onSelect={this.props.onSelect}
        />
    );
  }
}

const styles = {

  searchInput: {
    // margin: '1vh',
    background: 'rgba(245,245,245,0.8)',
    padding: '2px',
    width: '120px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '24px',
    color: 'rgba(53, 100, 253, 0.842)',
    textAlign: 'center'
  },
  menuStyle: {
    zIndex: 1,
    borderRadius: '4px',
    position: 'fixed',
    background: 'rgba(245,245,245,0.8)',
    fontSize: 12,
    height: '120px',
    width: '100px',
    overflow: 'auto',
  },
  icon: {
    margin: '1vh',
    fontSize: 20,
  },
}

export default AutoComplete;
