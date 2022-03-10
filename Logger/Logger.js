const { transports, format } = require('winston')
const winston = require('winston')
const expressWinston = require('express-winston')
require('winston-mongodb')

const logFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] - ${info.message}`
}))



const Logger = expressWinston.logger({
    transports: [
        new transports.File({ filename: "app.log" }),
    ],
    requestWhitelist: ['headers', 'query', 'body'],  //these are not included in the standard StackDriver httpRequest

    format: winston.format.combine(
        logFormat,
        winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false } // optional: allows to skip some log messages based on request and/or response
})

const ErrorLogger = expressWinston.errorLogger({
    transports: [
        new transports.MongoDB({
            db: process.env.CONNECTION_URL,
            options: { useUnifiedTopology: true },
            level: 'error',
            collection: 'node_blog_logs',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({ filename: "app.log" })
    ],
    responseWhitelist: ['body'], // this populates the `res.body` so we can get the response size (not required)

    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
})
module.exports = { Logger, ErrorLogger }


