'use strict'

let http = require('http')
let request = require('request')

let argv = require('yargs')
    .default('host', '127.0.0.1')
    .argv
let scheme = 'http://'
let port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80)
let destinationUrl = argv.url || scheme + argv.host + ':' + port

http.createServer((req, res) => {
    for (let header in req.headers) {
        res.setHeader(header, req.headers[header])
    }
    req.pipe(res)
}).listen(8000)

let proxyServer = http.createServer((req, res) => {
    console.log(`Proxying request to: ${destinationUrl + req.url}`)
    // x-destination-url overrides the destinationUrl
    let options = {
        headers: req.headers,
        url: req.headers['x-destination-url'] || `${destinationUrl}${req.url}`,
        method: req.method
    }
    req.pipe(request(options)).pipe(res)
}).listen(8001)

module.exports = proxyServer
