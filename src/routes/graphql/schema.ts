import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './types/rootQuery.js';

export const schema = new GraphQLSchema({
  query: RootQueryType,
});
