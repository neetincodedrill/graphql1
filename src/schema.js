const { gql } = require('apollo-server-express');

module.exports = gql`
type Book {
    id: ID!
    title: String!
    author: String!
    email: String!
}

type User {
    id: ID!
    username: String!
    email: String!
    password: String!,
    books: [Book!]!
}
type Query {
    hello: String,
    books:[Book!]!,
    book(id:ID!):Book!
}

type Mutation {
    addBook(title: String!,author: String!): Book!
    updateBook(id: ID!,title:String!,author: String!):Book!
    deleteBook(id: ID!):Boolean!
    signUp(username: String!,email: String!,password: String!):String!
    login(username: String!,email: String!,password: String!):String!
}
`