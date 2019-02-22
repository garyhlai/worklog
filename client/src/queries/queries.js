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
const addLogMutation = gql`
  mutation AddLog($logName: String!, $dateName: String!, $goalId: ID!) {
    addLog(logName: $logName, dateName: $dateName, goalId: $goalId) {
      dateName
    }
  }
`;

const deleteLogMutation = gql`
  mutation DeleteLog($dateName: String!, $logId: ID!) {
    deleteLog(dateName: $dateName, logId: $logId) {
      dateName
    }
  }
`;

const getDateQuery = gql`
  query GetDate($dateName: String!) {
    date(dateName: $dateName) {
      dateName
    }
  }
`;

const addGoalMutation = gql`
  mutation AddGoal($goalName: String!) {
    addGoal(goalName: $goalName) {
      goalName
    }
  }
`;

const deleteGoalMutation = gql`
  mutation DeleteGoal($goalId: ID!) {
    deleteGoal(goalId: $goalId) {
      goalName
    }
  }
`;

const addDateMutation = gql`
  mutation AddDate($dateName: String!) {
    addDate(dateName: $dateName) {
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
export {
  getGoalsQuery,
  addDateMutation,
  addLogMutation,
  deleteLogMutation,
  addGoalMutation,
  deleteGoalMutation,
  getLogsQuery,
  getDateQuery
};
