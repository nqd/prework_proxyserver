'use strict'

let http = require('http')
let request = require('request')

// arg
let argv = require('yargs')
    .default('host', '127.0.0.1')
    .argv
let scheme = 'http://'
let port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80)
let destinationUrl = argv.url || scheme + argv.host + ':' + port

// log
let path = require('path')
let fs = require('fs')
let logPath = argv.log && path.join(__dirname, argv.log)
let logStream = logPath ? fs.createWriteStream(logPath) : process.stdout

http.createServer((req, res) => {
    for (let header in req.headers) {
        res.setHeader(header, req.headers[header])
    }
    req.pipe(res)
}).listen(port)

let proxyServer = http.createServer((req, res) => {
    // x-destination-url overrides the destinationUrl
    let url = req.headers['x-destination-url'] || `${destinationUrl}${req.url}`
    console.log(`Proxying request to: ${url}`)
    let options = {
        headers: req.headers,
        url: url,
        method: req.method
    }

    // Log the req headers and content
    process.stdout.write('\n\n' + JSON.stringify(req.headers) + '\n')
    logStream.write('Request headers: ' + JSON.stringify(req.headers) + '\n')

    req.pipe(request(options)).pipe(res)
}).listen(8001)

module.exports = proxyServer
