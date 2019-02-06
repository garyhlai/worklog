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
      //return data.logs.map(log => {
      //return (
      //<li key={log.id} onClick={e => this.setState({ selected: log.id })}>
      //{log.logName}
      //</li>
      //);
      // });
      /*
      <li key={log.id} onClick={e => this.setState({ selected: log.id })}>
            {JSON.stringify(log.logs)}
          </li>*/
      return data.logs.map(date => {
        return date.logs.map(theLog => {
          return <li key={theLog.id}> {theLog.logName}</li>;
        });
      });
    }
  }
  render() {
    return (
      <div>
        <ul id="book-list">{this.displayLogs()}</ul>
      </div>
    );
  }
}

export default graphql(getLogsQuery)(LogList);
