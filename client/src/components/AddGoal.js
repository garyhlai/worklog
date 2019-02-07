import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getGoalsQuery,
  addGoalMutation
  // getBooksQuery
} from "../queries/queries";

class AddGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // no need to set the current date, it is set in the constructor
      // dateName: currentDate,
      goalName: ""
    };
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addGoalMutation({
      variables: {
        goalName: this.state.goalName
      },
      refetchQueries: [{ query: getGoalsQuery }]
    });
  }

  render() {
    return (
      //<form id="add-goal" onSubmit={this.submitForm.bind(this)}>
      <form id="add-goal" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Goal name:</label>
          <input
            required
            type="text"
            onChange={e => this.setState({ goalName: e.target.value })}
          />
        </div>
        <button>Add Goal</button>
      </form>
    );
  }
}

export default compose(
  graphql(addGoalMutation, { name: "addGoalMutation" }),
  graphql(getGoalsQuery, { name: "getGoalsQuery" })
)(AddGoal);
