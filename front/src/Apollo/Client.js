import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { withClientState } from "apollo-link-state";
import { setContext } from "apollo-link-context";
import { resolvers, defaults } from "./ClientState";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000",
  options: {
    reconnect: true,
  },
});

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
}));

const clientState = withClientState({
  defaults,
  resolvers,
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    setAuthorizationLink,
    clientState,
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    ),
  ]),
  cache: new InMemoryCache(),
});
export default client;
