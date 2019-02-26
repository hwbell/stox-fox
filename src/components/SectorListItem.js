<ListGroupItem key={i}>
                  {/* get rid of the 'Rank (letter): ' 
                  the <p> below shows each performance metric*/}

                  <p style={styles.listTitle}>{metric.slice(7)}</p>
                  
                  {/* now map within each metric to show corresponding
                  performance according to the metric. show delta as red for neg
                  and blue for pos. see below style */}

                  {sectors.map((sector, i) => {
                    let delta = data[metric][sector];
                    {/* check for a - symbol */}
                    let deltaColor = delta.indexOf('-') !== -1 ? 'red' : 'blue';

                    return (
                      <div key={i} className="row">
                      {/* here we show each sector and its change */}
                        <p style={styles.sector}>{`${sector}:`}</p>
                        <p style={{margin: '1vh', color: deltaColor}}>{delta}</p>

                      </div>
                    )
                  })}

                </ListGroupItem>