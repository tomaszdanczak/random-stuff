const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    greeting: String
    interestingUrls: [String]
    firstName: String
    email: String
    pets: [String]
  }
`;

const data = {
  greeting: "Hello world!",
  interestingUrls: [
    "https://tomaszdanczak.pl/",
    "https://katarzynawaclawek.pl/",
  ],
  firstName: "John",
  email: "john@example.com",
  pets: ["Mittens", "Doggo", "Birb"],
};

const server = new ApolloServer({
  typeDefs,
  rootValue: data,
  introspection: true,
  playground: true,
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({ port: PORT }).then((result) => console.log(result.url));
