import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const httpLink = new HttpLink({
  uri: "https://charity-api.fullstacksjs.com/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "/TmyeQmELjsgBdG26gGps7+KZ6F5A5WfJYhhwMURM00=", // مقدار کلید مدیریت Hasura را وارد کنید
  },
});

const client = new ApolloClient({
  uri: "https://charity-api.fullstacksjs.com/v1/graphql",
  link: httpLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
