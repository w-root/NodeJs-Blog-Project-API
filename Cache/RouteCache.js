const nodeCache = require('node-cache')
const cache = new nodeCache()

module.exports = (duration) => (req, res, next) => {
    if (req.method != 'GET') {
        console.log("Is not get method")
        return next()
    }
    const key = req.originalUrl
    const cachedResponse = cache.get(key)

    if (cachedResponse) {
        //console.log(`Cache hit for ${key}`)
        res.send(cachedResponse)
    } else {
        //console.log(`Cache missed for ${key}`)
        res.originalSend = res.send
        res.send = body => {
            res.originalSend(body)
            cache.set(key, body, duration)
        }
        next()
    }
}