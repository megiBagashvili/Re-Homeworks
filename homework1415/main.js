const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { logger } = require('./middlewares/logger.middleware')

const expenseRouter = require('./router/expense.router')
const factRouter = require('./router/fact.router')

dotenv.config()

const app = express()

app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
    res.send('Expense Tracker')
})

app.use('/expenses', expenseRouter)
app.use('/', factRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
