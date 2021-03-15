const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
 
const typeDefs = gql`
  type Query {
    hello: String,
    name: String,
    user: {String, String, Number}
  }
`;
 
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    name: () => "Igna Garcia",
    user: () => ({name: "IgnaGarcia", username: "Igna98", age: 22})
  },
};
 
const server = new ApolloServer({ typeDefs, resolvers });
 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);