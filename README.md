
# GraphQL MERN Stack Setup

This repository contains a comprehensive setup for integrating GraphQL with the MERN (MongoDB, Express, React, Node.js) stack. Below, you'll find detailed information on the packages used, their functionalities, and step-by-step instructions to set up the project.

## Packages and Their Descriptions

### `graphql`
- **Description**: The core GraphQL implementation in **JavaScript**.
- **Features**:
 - Define GraphQL schemas.
 - Parse and validate GraphQL queries.
 - Execute queries against a schema.
 - Format responses.
- **Note**: This is a standalone library and can be used in various JavaScript environments, not tied to any specific server or client framework.

### `@apollo/server`
- **Description**: A package from the Apollo ecosystem used for building GraphQL servers in Node.js.
- **Features**:
 - Create and manage GraphQL schemas.
 - Handle incoming GraphQL requests.
 - Execute queries and send responses.
 - Built on top of the express framework, making it easy to integrate with Node.js web applications.
- **Note**: Simplifies the process of creating and maintaining GraphQL servers in Node.js environments.

### Apollo Client
- **Description**: A state management library for JavaScript to manage both local and remote data with GraphQL.
- **Features**:
 - Fetch, cache, and modify application data.
 - Automatically update your UI.
 - Designed for modern React with support for hooks.
 - Compatible with any build setup and GraphQL API.
 - Community-driven with extensive developer support.

### GraphQL Schema
- **Description**: Defines the structure of the data clients can query and the operations they can perform.
- **Components**:
 - **TypeDefs**: Specify the types of objects that can be queried and their relationships.
 - **Resolvers**: Functions that determine how to fetch the data associated with each field in the schema.

## Installation

### Backend Dependencies
```bash
npm install express express-session graphql @apollo/server @graphql-tools/merge bcryptjs connect-mongodb-session dotenv graphql-passport passport mongoose`` 

### Frontend Dependencies

bash

Copy code

npm install graphql @apollo/client react-router-dom react-icons react-hot-toast tailwind-merge @tailwindcss/aspect-ratio clsx chart.js react-chartjs-2 mini-svg-data-uri framer-motion` 
```
## Basic Setup

### Install Apollo Client and GraphQL

```bash


npm install @apollo/client graphql` 
```
### Initialize Apollo Client

javascript


```bash
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
});` 
```
### Fetch Data Declaratively

javascript

```bash

import { useQuery } from "@apollo/client";
import { GET_DOGS } from "./queries";

function ShowDogs() {
  const { loading, error, data } = useQuery(GET_DOGS);
  if (error) return <Error />;
  if (loading) return <Fetching />;

  return <DogList dogs={data.dogs} />;
}` 
```

## Setting Up a MERN Stack Project with GraphQL

### 1. Backend Setup

#### Express Server

Create a file named `server.js` to set up a basic Express server:

javascript

```bash

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  app.use('/graphql', json(), expressMiddleware(server));

  app.listen({ port: 4000 }, () => {
    console.log('Server running at http://localhost:4000/graphql');
  });
}

startServer();` 
```
#### GraphQL Schema (TypeDefs)

Create a file named `typeDefs.js` to define your GraphQL schema:

javascript

```bash

const { gql } = require('apollo-server-express');

const typeDefs = gql` type Query {
    hello: String
    users: [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

module.exports = typeDefs;`` 
```
#### Resolvers

Create a file named `resolvers.js` to define how the data for each field in the schema is fetched:

javascript

```bash

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    users: () => users,
  },
  Mutation: {
    addUser: (_, { name, email }) => {
      const user = { id: users.length + 1, name, email };
      users.push(user);
      return user;
    },
  },
};

module.exports = resolvers;` 
```
### 2. Frontend Setup

#### React Application with Apollo Client

Integrate Apollo Client in your React application to manage GraphQL queries and state:


```bash

import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;` 
```
#### Fetching Data in React Component

Example of fetching data using Apollo Client's `useQuery` hook in a React component:


```bash
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql` query {
    users {
      id
      name
      email
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data.users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;`` 
```
## Copy & Paste Commands for Setup

### Backend


```bash
npm install express express-session graphql @apollo/server @graphql-tools/merge bcryptjs connect-mongodb-session dotenv graphql-passport passport mongoose` 
```
### Frontend


```bash

`npm install graphql @apollo/client react-router-dom react-icons react-hot-toast tailwind-merge @tailwindcss/aspect-ratio clsx chart.js react-chartjs-2 mini-svg-data-uri framer-motion` 
```
## Additional Resources

-   **GraphQL Documentation**: https://graphql.org/learn/
-   **Apollo Documentation**: https://www.apollographql.com/docs/
-   **MERN Stack Guide**: [https://www.mongodb.com/mern-stack](https://www.mongodb.com/mern-stack)

By following this README, you should be able to set up a full-fledged MERN stack project integrated with GraphQL. Happy coding!


```bash

 `This Markdown file includes all sections, including package descriptions, installation instructions, basic setup examples, backen`