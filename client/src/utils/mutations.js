import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook(
        input: {
            authors: $[authors]
            description: $description
            title: $title
            bookId: $bookId
            image: $image
            link: $link
        }
    )
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($book: String!) {
        removeBook(book: $book) {
            _id
            username
            savedBooks
        }
    }
`;