import { gql } from "apollo-boost";

const getGoalsQuery = gql`
  {
    goals {
      goalName
    }
  }
`;

/*
const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

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
export { getGoalsQuery };
