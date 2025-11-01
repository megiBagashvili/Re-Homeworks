const { readFile, writeFile } = require('../utils')

exports.getAllExpenses = async (query) => {
    const { page = 1, take = 10 } = query
    const expenses = await readFile('data/expenses.json', true)

    const limit = Math.min(Number(take), 50)
    const startIndex = (Number(page) - 1) * limit

    const paginated = expenses.slice(startIndex, startIndex + limit)

    return {
        total: expenses.length,
        page: Number(page),
        take: limit,
        data: paginated
    }
}

exports.createExpense = async ({ title, amount, category }) => {
    const expenses = await readFile('data/expenses.json', true)
    const lastId = expenses[expenses.length - 1]?.id || 0

    const newExpense = {
        id: lastId + 1,
        title,
        amount,
        category: category || 'General'
    }

    expenses.push(newExpense)
    await writeFile('data/expenses.json', expenses)
}

exports.getExpenseById = async ({ id }) => {
    const expenses = await readFile('data/expenses.json', true)
    const expense = expenses.find(e => e.id === id)

    return expense
}

exports.updateExpenseById = async ({ id, body }) => {
    const expenses = await readFile('data/expenses.json', true)
    const index = expenses.findIndex(e => e.id === id)

    if (index === -1) {
        return null
    }

    const updateReq = {}

    if (body.title) {
        updateReq.title = body.title
    }

    if (body.amount) {
        updateReq.amount = body.amount
    }

    if (body.category) {
        updateReq.category = body.category
    }

    expenses[index] = {
        ...expenses[index],
        ...updateReq
    }

    await writeFile('data/expenses.json', expenses)
    return expenses[index]
}

exports.deleteExpenseById = async ({ id }) => {
    const expenses = await readFile('data/expenses.json', true)
    const index = expenses.findIndex(e => e.id === id)

    if (index === -1) {
        return null
    }

    expenses.splice(index, 1)
    await writeFile('data/expenses.json', expenses)
    return true
}
