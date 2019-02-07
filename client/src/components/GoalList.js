import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getGoalsQuery } from "../queries/queries";

// components
//import BookDetails from './BookDetails';

class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayGoals() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading goals...</div>;
    } else {
      /*
      // return an array of array
      return data.logs.map(date => {
        // return an array of <li> logName </li> for each date
        return date.logs.map(theLog => {
          return <li key={theLog.id}> {theLog.logName}</li>;
        });
      });*/
      return data.goals.map(goal => {
        return <h3>{goal.goalName}</h3>;
      });
    }
  }

  render() {
    //console.log(this.displayGoals());
    return (
      <div>
        <h1> Goals </h1>
        <header id="goal-list">{this.displayGoals()}</header>
      </div>
    );
  }
}

export default graphql(getGoalsQuery)(GoalList);
