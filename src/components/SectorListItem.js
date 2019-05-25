
import React, { Component } from 'react';

// styling
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

// components
import { ListGroupItem, Progress } from 'reactstrap';

class SectorListItem extends Component {

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
    const data = this.props.data;
    const metric = this.props.metric;
    const sectors = this.props.sectors;

    // console.log(metric.replace(/\W/g, '').toLowerCase())
    // get the max of the data for the chart range
    // initialize to the first delta
    const firstDelta = data[metric][sectors[0]];

    // convert to number 
    let maxOfData = Number(firstDelta.slice(0, firstDelta.length - 1));

    Object.keys(data[metric]).forEach((sector, i) => {
      let delta = data[metric][sector];
      let deltaNum = Number(delta.slice(0, delta.length - 1));

      // set as new max if greater than
      if (deltaNum > maxOfData) { maxOfData = deltaNum };
    });

    // get the index to chop the metric title @ the word 'Performance'
    let sliceInd = metric.indexOf('Performance');

    return (
      <div style={styles.container} key={this.props.mapKey}>

        {/* strip and convert the metric to all lowercase and use it as 
        the id to target with dropDown */}
        <div className="row" id={metric.replace(/\W/g, '').toLowerCase()}>

          {/* get rid of the 'Rank (letter): ' part
                  the <p> below shows the performance metric*/}
          <p className="col" style={styles.listTitle}>{metric.slice(7, sliceInd)}</p>

        </div>

        {/* now map within each metric to show corresponding
                  performance according to the metric. show delta as red for neg
                  and blue for pos. see below style */}

        {sectors.map((sector, i) => {
          let delta = data[metric][sector];

          {/* check for a - symbol ...  EX "-0.05%" 
          Make red if - symbol found */ }
          let deltaColor = delta.indexOf('-') !== -1 ? '#EF9A9A' : '#90CAF9';
          let barStyle = {
            backgroundColor: deltaColor,
            width: '70%',
            minWidth: '200px'
          }

          {/* convert to number, as it comes in string as "0.05%" or -0.05% */ }
          let deltaNum = Number(delta.slice(0, delta.length - 1));

          return (
            <div key={i} className="">
              <div className="row" style={styles.info}>
                {/* here we show each sector and its change */}
                <p style={styles.sector}>{`${sector}:`}</p>
                <p style={{ margin: '1vw 0.5vw', color: deltaColor }}>{delta}</p>
              </div>

              <Progress style={barStyle} max={maxOfData + 1}
                color={deltaColor}
                value={deltaNum < 0 ? -deltaNum : deltaNum}
                color={deltaNum < 0 ? "danger" : ""} />

            </div>

          )
        })}

      </div>
    );
  }
}

const styles = {
  container: {
    zIndex: 1,
    padding: '30px',
    backgroundColor: 'none'
  },
  listTitle: {
    // color: 'black',
    fontSize: 'calc(20px)',
    fontWeight: 'bold'
  },
  info: {
    padding: '8px'
  },
  sector: {
    margin: '1vw',
    fontWeight: 550
  },

}

export default SectorListItem;
