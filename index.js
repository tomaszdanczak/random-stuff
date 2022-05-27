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
    today: DayOfWeek
    workDays: [DayOfWeek]
    currentMonth: Month
    monthsElapsed: [Month]
  }

  enum DayOfWeek {
    MON
    TUE
    WED
    THU
    SAT
    FRI
    SUN
  }

  enum Month {
    JAN
    FEB
    MAR
    APR
    MAY
    JUN
    JUL
    AUG
    SEP
    OCT
    NOV
    DEC
  }
`;

function rootValue() {
  const getRandomDiceThrow = (sides) => Math.ceil(Math.random() * sides);

  const today = new Date();

  const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const MONTHS_OF_YEAR = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

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

  const getmonthsElapsed = () => {
    // const monthsElapsed = Array.from(Array(today.getMonth()));
    const monthsElapsed = Array.from(Array(0));

    return monthsElapsed.map((_, index) => MONTHS_OF_YEAR[index]);
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
    today: DAYS_OF_WEEK[today.getDay()],
    workDays: DAYS_OF_WEEK.slice(1, 6),
    currentMonth: MONTHS_OF_YEAR[today.getMonth()],
    monthsElapsed: getmonthsElapsed(),
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
