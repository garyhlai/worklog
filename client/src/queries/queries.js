import { gql } from "apollo-boost";

const getGoalsQuery = gql`
  {
    goals {
      id
      goalName
    }
  }
`;

const getLogsQuery = gql`
  {
    logs {
      id
      dateName
      logs {
        id
        logName
        goalId
      }
    }
  }
`;

const addLogMutation = gql`
  mutation AddLog($logName: String!, $dateName: String!, $goalId: ID!) {
    addLog(logName: $logName, dateName: $dateName, goalId: $goalId) {
      dateName
    }
  }
`;
/*
const getBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;*/

//export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
export { getGoalsQuery, addLogMutation, getLogsQuery };
