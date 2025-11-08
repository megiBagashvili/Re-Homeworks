const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        default: 'General'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
//completed task 2