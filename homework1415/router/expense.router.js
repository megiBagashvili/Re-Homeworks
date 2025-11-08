const { Router } = require('express')
const ExpenseController = require('../controllers/expense.controller')
const validateExpense = require('../middlewares/validateExpense.middleware')

const expenseRouter = Router()

expenseRouter.get('/', ExpenseController.getAllExpenses)

expenseRouter.get('/top-5', ExpenseController.getTop5Expenses);

expenseRouter.post('/', validateExpense, ExpenseController.createExpense)

expenseRouter.get('/:id', ExpenseController.getExpenseById)

expenseRouter.patch('/:id', ExpenseController.updateExpenseById)

expenseRouter.delete('/:id', ExpenseController.deleteExpenseById)

module.exports = expenseRouter
