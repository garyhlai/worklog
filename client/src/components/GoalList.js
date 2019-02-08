import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getGoalsQuery, deleteGoalMutation } from "../queries/queries";

// components
//import BookDetails from './BookDetails';

class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  deleteGoal(value) {
    //console.log(value);
    this.props.deleteGoalMutation({
      variables: {
        goalId: value
      },
      refetchQueries: [{ query: getGoalsQuery }]
    });
  }
  displayGoals() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading goals...</div>;
    } else {
      return data.goals.map(goal => {
        return (
          <div>
            <h3 style={{ display: "inline" }}>{goal.goalName}</h3>
            <button onClick={this.deleteGoal.bind(this, goal.id)}>-</button>
          </div>
        );
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

export default compose(
  graphql(getGoalsQuery),
  graphql(deleteGoalMutation, { name: "deleteGoalMutation" })
)(GoalList);
