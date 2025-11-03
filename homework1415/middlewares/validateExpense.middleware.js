module.exports = (req, res, next) => {
    const { title, amount } = req.body

    if (!title || !amount) {
        return res.status(400).json({ error: true, message: 'title and amount are required' })
    }

    if (typeof title !== 'string' || typeof amount !== 'number' || amount < 0) {
        return res.status(400).json({ error: true, message: 'Invalid data types in title or amount' })
    }

    next()
}
