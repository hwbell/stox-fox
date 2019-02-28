
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

    // get the max of the data for the chart range
    // initialize to the first delta
    const firstDelta = data[metric][sectors[0]];

    // convert to number 
    let maxOfData = Number(firstDelta.slice(0, firstDelta.length-1));

    Object.keys(data[metric]).forEach((sector, i) => {
      let delta = data[metric][sector];
      let deltaNum = Number(delta.slice(0, delta.length - 1));

      // set as new max if greater than
      if (deltaNum > maxOfData) {maxOfData = deltaNum};
    })

    return (
      <ListGroupItem key={this.props.mapKey}>
        {/* get rid of the 'Rank (letter): ' part
                  the <p> below shows the performance metric*/}

        <div className="row">
          <p className="col" style={styles.listTitle}>{metric.slice(7)}</p>
        </div>

        {/* now map within each metric to show corresponding
                  performance according to the metric. show delta as red for neg
                  and blue for pos. see below style */}

        {sectors.map((sector, i) => {
          let delta = data[metric][sector];

          {/* check for a - symbol ...  EX "-0.05%" 
          Make red if - symbol found */ }
          let deltaColor = delta.indexOf('-') !== -1 ? 'red' : 'blue';

          {/* convert to number, as it comes in string as "0.05%" or -0.05% */ }
          let deltaNum = Number(delta.slice(0, delta.length - 1));
          
          return (
            <div key={i} className="">
              <div className="row">
                {/* here we show each sector and its change */}
                <p style={styles.sector}>{`${sector}:`}</p>
                <p style={{ margin: '1vh', color: deltaColor }}>{delta}</p>
              </div>

              <Progress max={maxOfData+1}
                value={deltaNum < 0 ? -deltaNum : deltaNum}
                color={deltaNum < 0 ? "danger" : ""} />

            </div>
            
          )
        })}

      </ListGroupItem>
    );
  }
}

const styles = {
  header: {
    width: '100%',
    margin: '3vh'
  },
  listTitle: {
    // textAlign: 'left',
    fontWeight: 'bold'
  },

  sector: {
    margin: '1vh',
    fontWeight: 550
  },

}

export default SectorListItem;