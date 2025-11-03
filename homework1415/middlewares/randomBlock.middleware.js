exports.randomBlock = (req, res, next) => {
    const random = Math.random()

    if (random < 0.5) {
        return res.status(403).json({
            error: true,
            message: 'Request blocked randomly. Try again'
        })
    }
    next()
}
