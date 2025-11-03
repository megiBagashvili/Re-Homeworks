const express = require('express')
const { logger } = require('./middlewares/logger.middleware')

const expenseRouter = require('./router/expense.router')
const factRouter = require('./router/fact.router')

const app = express()

app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
    res.send('Expense Tracker')
})

app.use('/expenses', expenseRouter)
app.use('/', factRouter)

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
