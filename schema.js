import {
    loadFilesSync,
    makeExecutableSchema,
    mergeResolvers,
    mergeTypeDefs,
  } from "graphql-tools";

const loadTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`);

const typeDefs = mergeTypeDefs(loadTypes);
const resolvers = mergeResolvers(loadResolvers);

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;