import { users, expenses } from "./data.js";

export const resolvers = {
  User: {
    expenses: (parent) => {
      return expenses.filter((e) => e.userId === parent.id);
    },
  },
  Expense: {
    user: (parent) => {
      return users.find((u) => u.id === parent.userId);
    },
  },

  Query: {
    users: () => users,
    user: (_, { id }) => users.find((u) => u.id === id),
    expenses: () => expenses,
    expense: (_, { id }) => expenses.find((e) => e.id === id),
  },

  Mutation: {
    createUser: (_, { input }) => {
      const newUser = {
        id: String(users.length + 1),
        ...input,
      };
      users.push(newUser);
      return newUser;
    },
    deleteUser: (_, { id }) => {
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) return null;
      const deleted = users.splice(index, 1);
      return deleted[0];
    },

    createExpense: (_, { input }) => {
      const newExpense = {
        id: String(Date.now()),
        ...input,
      };
      expenses.push(newExpense);
      return newExpense;
    },
    deleteExpense: (_, { id }) => {
      const index = expenses.findIndex((e) => e.id === id);
      if (index === -1) return null;
      const deleted = expenses.splice(index, 1);
      return deleted[0];
    },
  },
};