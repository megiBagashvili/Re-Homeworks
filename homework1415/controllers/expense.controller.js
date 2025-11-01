const ExpensesService = require('../services/expense.service')

exports.getAllExpenses = async (req, res) => {
    try {
        const { page = 1, take = 10 } = req.query
        const data = await ExpensesService.getAllExpenses({ page: Number(page), take: Number(take) })
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: true, message: error.message })
    }
}

exports.createExpense = async (req, res) => {
    try {
        const { title, amount, category } = req.body
        if (!title || !amount) {
            return res.status(400).json({ error: true, message: 'title and amount are required' })
        }

        await ExpensesService.createExpense({ title, amount, category })
        res.status(201).json({ success: true, message: 'Expense created successfully' })
    } catch (error) {
        res.status(500).json({ error: true, message: error.message })
    }
}

exports.getExpenseById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const expense = await ExpensesService.getExpenseById({ id })
        if (!expense) {
            return res.status(404).json({ error: true, message: 'Expense not found' })
        }
        res.json(expense)
    } catch (error) {
        res.status(500).json({ error: true, message: error.message })
    }
}

exports.updateExpenseById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const updatedExpense = await ExpensesService.updateExpenseById({ id, body: req.body })
        if (!updatedExpense) {
            return res.status(404).json({ error: true, message: 'Expense not found' })
        }
        res.json(updatedExpense)
    } catch (error) {
        res.status(500).json({ error: true, message: error.message })
    }
}

exports.deleteExpenseById = async (req, res) => {
    try {
        const secret = req.headers['secret']
        if (secret !== 'random123') {
            return res.status(403).json({ error: true, message: 'Invalid secret code' })
        }

        const id = Number(req.params.id)
        const deleted = await ExpensesService.deleteExpenseById({ id })

        if (!deleted) {
            return res.status(404).json({ error: true, message: 'Expense not found' })
        }

        res.json({ success: true, message: 'Expense deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: true, message: error.message })
    }
}
