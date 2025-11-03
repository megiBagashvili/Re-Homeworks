const { Router } = require('express')
const ExpenseController = require('../controllers/expense.controller')
const { secretCheck } = require('../middlewares/secret.middleware')

const expenseRouter = Router()

expenseRouter.get('/', ExpenseController.getAllExpenses)

expenseRouter.post('/', ExpenseController.createExpense)

expenseRouter.get('/:id', ExpenseController.getExpenseById)

expenseRouter.patch('/:id', ExpenseController.updateExpenseById)

expenseRouter.delete('/:id', secretCheck, ExpenseController.deleteExpenseById)

module.exports = expenseRouter
