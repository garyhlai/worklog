import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// components
import LogList from "./components/LogList";
import GoalList from "./components/GoalList";
import AddLog from "./components/AddLog";
import AddGoal from "./components/AddGoal";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Sospiro Work Log</h1>
          <AddLog />
          <AddGoal />
          <LogList />
          <GoalList />
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
