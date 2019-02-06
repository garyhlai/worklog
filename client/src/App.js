import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// components
//import BookList from "./components/BookList";
import AddLog from "./components/AddLog";

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
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
