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

    type Mutation {
        createMovie(title: String!, year: Int!, genre: String): Movie
    }
`;

const resolvers = {
    Query: {
        movies: () => {
            client.movie.findMany();
        },
        movie: () => ({ title: "hello title", year: 2021}),
    },
    Mutation: {
        createMovie: (_, { title, year, genre }) => {
            console.log(client.movie.create({
                data: {
                    title,
                    year,
                    genre,
                },
            }),)
            
        }

    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(() => console.log("Server is running"));