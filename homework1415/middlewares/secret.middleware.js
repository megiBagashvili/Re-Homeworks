exports.secretCheck = (req, res, next) => {
    const secret = req.headers['secret']

    if (secret !== 'random123') {
        return res.status(403).json({ error: true, message: 'Invalid secret code' })
    }

    next()
}
