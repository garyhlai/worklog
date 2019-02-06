import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getGoalsQuery
  //addBookMutation,
  // getBooksQuery
} from "../queries/queries";

class AddLog extends Component {
  constructor(props) {
    super(props);
    var currentDate = new Date();
    this.state = {
      dateName: currentDate,
      logs: [{ logName: "", goalId: "" }]
    };
  }
  displayGoals() {
    var data = this.props.getGoalsQuery;
    if (data.loading) {
      return <option disabled>Loading goals</option>;
    } else {
      //console.log(data.goals);
      return data.goals.map(goal => {
        return (
          <option key={goal.id} value={goal.id}>
            {goal.goalName}
          </option>
        );
      });
      // return console.log(data);
    }
  }
  /*
  submitForm(e) {
    e.preventDefault();
    // use the addBookMutation
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }*/

  render() {
    return (
      /*
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Log name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>*/
      <form>
        <div className="field">
          <label>Goal:</label>
          <select onChange={e => this.setState({ dateName: e.target.value })}>
            <option>Select goal</option>
            {this.displayGoals()}
          </select>
        </div>
        <button>+</button>
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

export default compose(graphql(getGoalsQuery, { name: "getGoalsQuery" }))(
  AddLog
);
