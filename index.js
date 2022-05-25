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
    randomDiceThrow: Int
    pi: Float
    isTodayFriday: Boolean
    randomCoinTossesUntilTrue: [Boolean]
    e: Float
    eulersSeries: [Float]
  }
`;

function rootValue() {
  const getRandomDiceThrow = (sides) => Math.ceil(Math.random() * sides);

  const today = new Date();

  const getRandomCoinToss = () => Math.random() > 0.5;

  const getRandomCoinTossesUntilTrue = () => {
    const randomCoinTosses = [];

    while (true) {
      const randomCoinToss = getRandomCoinToss();

      randomCoinTosses.push(randomCoinToss);

      if (randomCoinToss) break;
    }

    return randomCoinTosses;
  };

  const getEulerElement = (index) => Math.pow(1 + 1 / (index + 1), index + 1);

  const getEulersSeries = () => {
    const eulersSeries = Array.from(Array(1000));

    return eulersSeries.map((_, index) => getEulerElement(index));
  };

  const data = {
    greeting: "Hello world!",
    interestingUrls: [
      "https://tomaszdanczak.pl/",
      "https://katarzynawaclawek.pl/",
    ],
    firstName: "John",
    email: "john@example.com",
    pets: ["Mittens", "Doggo", "Birb"],
    randomDiceThrow: getRandomDiceThrow(6),
    pi: Math.PI,
    isTodayFriday: today.getDay() === 5,
    randomCoinTossesUntilTrue: getRandomCoinTossesUntilTrue(),
    e: Math.E,
    eulersSeries: getEulersSeries(),
  };
  return data;
}

const server = new ApolloServer({
  typeDefs,
  rootValue,
  introspection: true,
  playground: true,
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({ port: PORT }).then((result) => console.log(result.url));
