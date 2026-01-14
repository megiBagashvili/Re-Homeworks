export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    expenses: [Expense]
  }

  type Expense {
    id: ID!
    amount: Float!
    category: String!
    userId: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    expenses: [Expense]
    expense(id: ID!): Expense
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input CreateExpenseInput {
    amount: Float!
    category: String!
    userId: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    deleteUser(id: ID!): User

    createExpense(input: CreateExpenseInput!): Expense
    deleteExpense(id: ID!): Expense
  }
`;