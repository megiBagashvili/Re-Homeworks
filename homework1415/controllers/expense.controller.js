const ExpensesService = require('../services/expense.service')

exports.getAllExpenses = async (req, res) => {
    const { page = 1, take = 10, category, amountFrom, amountTo } = req.query;

    const data = await ExpensesService.getAllExpenses({
        page: Number(page),
        take: Number(take),
        category,
        amountFrom,
        amountTo
    });

    res.json(data);
};


exports.createExpense = async (req, res) => {
    const { title, amount, category } = req.body
    if (!title || !amount) {
        return res.status(400).json({ error: true, message: 'title and amount are required' })
    }

      if (typeof title !== 'string' || typeof amount !== 'number' || amount < 0) {
        return res.status(400).json({ error: true, message: 'Invalid data types in title or amount' })
    }

    await ExpensesService.createExpense({ title, amount, category })
    res.status(201).json({ success: true, message: 'Expense created successfully' })
}

exports.getExpenseById = async (req, res) => {
    const id = req.params.id
    const expense = await ExpensesService.getExpenseById({ id })
    if (!expense) {
        return res.status(404).json({ error: true, message: 'Expense not found' })
    }
    res.json(expense)
}

exports.updateExpenseById = async (req, res) => {
    const id = req.params.id
    const { title, amount, category } = req.body

    if (title && typeof title !== 'string') {
        return res.status(400).json({ error: true, message: 'title must be a string' })
    }

    if (amount && (typeof amount !== 'number' || amount < 0)) {
        return res.status(400).json({ error: true, message: 'amount must be a positive number' })
    }

    if (category && typeof category !== 'string') {
        return res.status(400).json({ error: true, message: 'category must be a string' })
    }

    const updatedExpense = await ExpensesService.updateExpenseById({ id, body: req.body })

    if (!updatedExpense) {
        return res.status(404).json({ error: true, message: 'Expense not found' })
    }

    res.json(updatedExpense)
}

exports.deleteExpenseById = async (req, res) => {
    const secret = req.headers['secret']
    if (secret !== 'random123') {
        return res.status(403).json({ error: true, message: 'Invalid secret code' })
    }

    const id = req.params.id
    const deleted = await ExpensesService.deleteExpenseById({ id })

    if (!deleted) {
        return res.status(404).json({ error: true, message: 'Expense not found' })
    }
    res.json({ success: true, message: 'Expense deleted successfully' })
}

exports.getTop5Expenses = async (req, res) => {
    const data = await ExpensesService.getTop5Expenses();
    res.json(data);
};
