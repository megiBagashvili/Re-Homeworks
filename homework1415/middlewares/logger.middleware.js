exports.logger = (req, res, next) => {
    const time = Date.now()
    res.on('finish', () => {
        const duration = Date.now() - time
        console.log(req.method, req.originalUrl, res.statusCode, `${duration}ms`)
    })
    next()
}
