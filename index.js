const express = require('express');
const { ApolloServer } = require('apollo-server-express')
require('dotenv').config();
const models = require('./src/models')
const jwt = require('jsonwebtoken')


//server port
const { PORT } = process.env;
const port = process.env.port || PORT;

//connect to database
require("./db").connect();

//graphql schema
const typeDefs = require('./src/schema')

// graphql resolvers function
const resolvers = require('./src/resolvers')

const app = express();

//create an instance of apollo server_request
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.start().then(res => {
    //apply the apollo middleware and set its path to /api
    server.applyMiddleware({app, path: '/api'})
    app.listen({port}, () => 
    console.log(`Server is running at http://localhost:${port}`
    ))
})



