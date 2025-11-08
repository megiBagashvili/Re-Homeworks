const mongoose = require('mongoose');
const Expense = require('../models/expense.model');

exports.getAllExpenses = async (query) => {
    const { page = 1, take = 10, category, amountFrom, amountTo } = query;

    const limit = Math.min(Number(take), 30);
    const skip = (Number(page) - 1) * limit;

    const filter = {};
    if (category) {
    const categories = category.split(',').map(c => new RegExp(`^${c.trim()}$`, 'i'));
    filter.category = { $in: categories };
}

    if (amountFrom || amountTo) {
        filter.amount = {};
        if (amountFrom) filter.amount.$gte = Number(amountFrom);
        if (amountTo) filter.amount.$lte = Number(amountTo);
    }

    const total = await Expense.countDocuments(filter);
    const data = await Expense.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return {
        total,
        page: Number(page),
        take: limit,
        data
    };
};

exports.createExpense = async ({ title, amount, category }) => {
    const expense = new Expense({
        title,
        amount,
        category: category || 'General'
    });
    await expense.save();
    return expense;
};

exports.getExpenseById = async ({ id }) => {
    if (!mongoose.isValidObjectId(id)) return null;
    return await Expense.findById(id);
};

exports.updateExpenseById = async ({ id, body }) => {
    if (!mongoose.isValidObjectId(id)) return null;

    const updateReq = {};
    if (body.title) updateReq.title = body.title;
    if (body.amount) updateReq.amount = body.amount;
    if (body.category) updateReq.category = body.category;

    const updated = await Expense.findByIdAndUpdate(id, updateReq, { new: true });
    return updated;
};

exports.deleteExpenseById = async ({ id }) => {
    if (!mongoose.isValidObjectId(id)) return null;
    const deleted = await Expense.findByIdAndDelete(id);
    return !!deleted;
};

exports.getTop5Expenses = async () => {
    const data = await Expense.find().sort({ amount: -1 }).limit(5);
    return data;
};
