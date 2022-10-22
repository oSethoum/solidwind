import { Component, createResource, Show } from "solid-js";
import { createClient, gql } from "@urql/core";
import { UserConnection } from "./graphql";

const client = createClient({
  url: "http://localhost:5000/query",
});

const QUERY = gql`
  query {
    users {
      edges {
        node {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const [users, { refetch }] = createResource<UserConnection>(
  async () => (await client.query(QUERY, {}).toPromise()).data
);

const App: Component = () => {
  return (
    <div>
      <span>{users.loading && "Loading..."}</span>
      <pre>{JSON.stringify(users(), null, 2)}</pre>
    </div>
  );
};

export default App;
