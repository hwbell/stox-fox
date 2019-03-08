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
      <div className="col scroll">
        {/* <p className="col padding-0">from</p> */}
        <Autocomplete className="auto-complete-form"
          inputProps={{ style: styles.searchInput }}
          items={this.props.items}
          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.code}
          renderItem={(item, highlighted) =>
            <div
              key={item.code}
              style={{
                borderRadius: 10,
                backgroundColor: highlighted ? '#eee' : 'white'
              }}
            >
              {item.code}
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
    width: '10vh',
    border: 'none',
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  menuStyle: {
    zIndex: 1,
    borderRadius: '10px',
    position: 'fixed',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    textAlign: 'left',
    fontSize: 12,
    height: '30vh',
    width: '10vh',
    overflow: 'auto',
    // maxHeight: '50%',
  }
}

export default AutoComplete;
