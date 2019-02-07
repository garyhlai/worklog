import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getLogsQuery } from "../queries/queries";

// components
//import BookDetails from './BookDetails';

class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayLogs() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      /*
      // return an array of array
      return data.logs.map(date => {
        // return an array of <li> logName </li> for each date
        return date.logs.map(theLog => {
          return <li key={theLog.id}> {theLog.logName}</li>;
        });
      });*/
      return data.logs.map(date => {
        return (
          <div>
            <h1>{date.dateName}</h1>
            <h4>
              {date.logs.map(theLog => {
                return <li key={theLog._id}> {theLog.logName}</li>;
              })}
            </h4>
          </div>
        );
      });
    }
  }

  render() {
    console.log(this.displayLogs());
    return (
      <div>
        <header id="log-list">{this.displayLogs()}</header>
      </div>
    );
  }
}

export default graphql(getLogsQuery)(LogList);
