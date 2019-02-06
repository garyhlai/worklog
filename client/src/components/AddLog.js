import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getGoalsQuery,
  addLogMutation
  // getBooksQuery
} from "../queries/queries";

class AddLog extends Component {
  constructor(props) {
    super(props);
    var currentDate = new Date().toDateString();
    this.state = {
      // no need to set the current date, it is set in the constructor
      // dateName: currentDate,
      dateName: "10-2-2019",
      logName: "",
      goalId: ""
    };
  }
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
  }

  submitForm(e) {
    e.preventDefault();
    // use the addBookMutation
    this.props.addLogMutation({
      variables: {
        logName: this.state.logName,
        dateName: this.state.dateName,
        goalId: this.state.goalId
      }
      //  refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form id="add-log" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label style={{ display: "block" }}>
            Todays is {this.state.dateName}
          </label>
          <label>Log name:</label>
          <input
            type="text"
            onChange={e => this.setState({ logName: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Goal:</label>
          <select onChange={e => this.setState({ goalId: e.target.value })}>
            <option>Select goal</option>
            {this.displayGoals()}
          </select>
        </div>
        <button>Add Log</button>
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
  graphql(getGoalsQuery, { name: "getGoalsQuery" }),
  graphql(addLogMutation, { name: "addLogMutation" })
)(AddLog);
