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
  /*
  displayGoals() {
    var data = this.props.getGoalsQuery;
    if (data.loading) {
      return <option disabled>Loading goals</option>;
    } else {
      //console.log(data.goals);
      return data.goals.map(goal => {
        //console.log(goal);
        return (
          <option key={goal.id} value={goal.id}>
            {goal.goalName}
          </option>
        );
      });
    }
  }*/

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
            type="text"
            onChange={e => this.setState({ goalName: e.target.value })}
          />
        </div>
        <button>Add Goal</button>
      </form>
    );
  }
}
/*
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddLog);
*/

export default compose(
  graphql(addGoalMutation, { name: "addGoalMutation" }),
  graphql(getGoalsQuery, { name: "getGoalsQuery" })
)(AddGoal);
