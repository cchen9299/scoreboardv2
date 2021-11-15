import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import dotenv from "dotenv";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import * as Realm from "realm-web";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

dotenv.config();
const APP_ID = "scoreboard-vvnfl";
// const APP_ID = process.env.APP_ID;
const API_KEY = process.env.MONGODB_GRAPHQL_API_KEY;
const app = new Realm.App(APP_ID);

async function getValidAccessToken() {
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.apiKey(API_KEY));
  } else {
    await app.currentUser.refreshCustomData();
  }

  return app.currentUser.accessToken;
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
