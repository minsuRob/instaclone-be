const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    type Movie {
        title: String
        year: Int
    }    

    type Query {
        movies: [Movie]
        movie : Movie
    }
`;

const resolvers = {
    Query: {
        movies: () => [],
        movie: () => ({ title: "hello title", year: 2021}),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(() => console.log("Server is running"));