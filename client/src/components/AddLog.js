import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getGoalsQuery,
  addLogMutation,
  getLogsQuery,
  addDateMutation
  //getDateQuery
} from "../queries/queries";

class AddLog extends Component {
  constructor(props) {
    super(props);
    var currentDate = new Date().toDateString();
    this.state = {
      dateName: currentDate,
      logName: "",
      goalId: ""
    };
  }

  displayGoals() {
    var data = this.props.getGoalsQuery;
    if (data.loading) {
      return <option disabled>Loading goals</option>;
    } else {
      return data.goals.map(goal => {
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

    this.props.addLogMutation({
      variables: {
        logName: this.state.logName,
        dateName: this.state.dateName,
        goalId: this.state.goalId
      },
      refetchQueries: [{ query: getLogsQuery }]
    });
    this.setState({ logName: "" });
  }

  componentDidMount() {
    var goalSelector = document.getElementById("selectGoal");
    goalSelector.setCustomValidity("Please select!!!");
  }

  render() {
    return (
      <div>
        <form id="add-log" onSubmit={this.submitForm.bind(this)}>
          <div className="field">
            <label>Log name:</label>
            <input
              required
              value={this.state.logName}
              type="text"
              onChange={e => {
                this.setState({ logName: e.target.value });
              }}
            />
          </div>
          <div className="field">
            <label>Goal:</label>
            <select
              id="selectGoal"
              onChange={e => {
                this.setState({ goalId: e.target.value });

                var goalSelector = document.getElementById("selectGoal");
                if (e.target.value === "") {
                  console.log("e.target.value: " + e.target.value);
                  goalSelector.setCustomValidity("This is wrong!");
                } else {
                  console.log("e.target.value in else: " + e.target.value);
                  goalSelector.setCustomValidity("");
                }
              }}
            >
              <option value="">Select goal</option>
              {this.displayGoals()}
            </select>
          </div>
          <button>Add Log</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(addDateMutation, { name: "addDateMutation" }),
  graphql(getGoalsQuery, { name: "getGoalsQuery" }),
  graphql(addLogMutation, { name: "addLogMutation" }),
  graphql(getLogsQuery, { name: "getLogsQuery" })
)(AddLog);
