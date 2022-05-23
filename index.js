const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    greeting: String
    interestingUrls: [String]
  }
`;

const data = {
  greeting: "Hello world!",
  interestingUrls: [
    "https://tomaszdanczak.pl/",
    "https://katarzynawaclawek.pl/",
  ],
};

const server = new ApolloServer({ typeDefs, rootValue: data });

server.listen({ port: 4000 }).then((result) => console.log(result.url));
