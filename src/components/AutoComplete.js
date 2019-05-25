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
      <div className="scroll">
        <Autocomplete className=""
          inputProps={{ style: styles.searchInput }}
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
              <p style={{fontSize: '14px'}} className="autocomplete-item">{item.code}</p>
            </div>
          }
          menuStyle={styles.menuStyle}
          value={this.props.value}
          onChange={this.props.onChange}
          onSelect={this.props.onSelect}
        />
      </div>
    );
  }
}

const styles = {
  searchInput: {
    margin: '1vh',
    background: 'none',
    padding: '0px',
    width: '10vh',
    border: 'none',
    fontSize: '32px',
    // fontWeight: 'bold',
    color: 'white'
  },
  menuStyle: {
    zIndex: 1,
    borderRadius: '4px',
    position: 'fixed',
    background: 'rgba(25,25,25, 0.9)',
    // padding: '5px',
    // textAlign: 'center',
    fontSize: 12,
    height: '15vh',
    width: '10vh',
    overflow: 'auto',
    // maxHeight: '50%',
  },
  icon: {
    margin: '1vh',
    fontSize: 20,
  },
}

export default AutoComplete;
