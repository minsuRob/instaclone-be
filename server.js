const { PrismaClient } = require('@prisma/client');
const {ApolloServer, gql} = require('apollo-server');

const client = new PrismaClient();

const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
        year: Int!
        genre: String
        createAt: String!
        updateAt: String!
    }    

    type Query {
        movies: [Movie]
        movie : Movie
    }
`;

const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: () => ({ title: "hello title", year: 2021}),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(() => console.log("Server is running"));