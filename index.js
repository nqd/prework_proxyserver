'use strict'

let http = require('http')
let https = require('https')
let request = require('request')
let fs = require('fs')

// arg
let argv = require('yargs')
    .usage('Usage: node $0 [options]')
    .options({
      'p': {
        alias: 'port',
        describe: 'Specify a forwarding port',
        type: 'number'
      },
      'x': {
        alias: 'host',
        default: '127.0.0.1',
        describe: 'Specify a forwarding host',
        type: 'string'
      },
      'u': {
        alias: 'url',
        describe: 'Specify a forwarding destination',
        type: 'string'
      },
      'ps': {
        alias: 'port-ssl',
        describe: 'Specify a forwarding port',
        type: 'number'
      },
      'xs': {
        alias: 'host-ssl',
        default: '127.0.0.1',
        describe: 'Specify a forwarding host',
        type: 'string'
      },
      'us': {
        alias: 'url-ssl',
        describe: 'Specify a forwarding destination',
        type: 'string'
      },
      'l': {
        alias: 'logfile',
        describe: 'Specify a log file',
        type: 'string'
      }
    })
    .help('h').alias('h', 'help')
    .argv

// http
let scheme = 'http://'
let port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80)
let destinationUrl = argv.url || scheme + argv.host + ':' + port

// https
let scheme_s = 'https://'
let port_s = argv.ps || (argv.xs === '127.0.0.1' ? 4443 : 443)
let destinationUrl_s = argv.us || scheme_s + argv.xs + ':' + port_s

let options = {
  key: fs.readFileSync('./key/key.pem'), // eslint-disable-line
  cert: fs.readFileSync('./key/cert.pem') // eslint-disable-line
}

// log
let path = require('path')
let logPath = argv.logfile && path.join(__dirname, argv.logfile)
let logStream = logPath ? fs.createWriteStream(logPath) : process.stdout

http.createServer((req, res) => {
    for (let header in req.headers) {
        res.setHeader(header, req.headers[header])
    }
    req.pipe(res)
}).listen(port)

http.createServer((req, res) => {
    // x-destination-url overrides the destinationUrl
    let url = req.headers['x-destination-url'] || `${destinationUrl}${req.url}`
    console.log(`Proxying request to: ${url}`)
    let options = {
        headers: req.headers,
        url: url,
        method: req.method
    }

    let outboundResponse = request(options)
    req.pipe(outboundResponse)
    req.pipe(logStream, {end: false})

    // log the response
    outboundResponse.pipe(logStream, {end: false})
    outboundResponse.pipe(res)
}).listen(8001)

https.createServer(options, (req, res) => {
    // x-destination-url overrides the destinationUrl
    let url = req.headers['x-destination-url'] || `${destinationUrl}${req.url}`
    console.log(`Proxying request to: ${url}`)
    let options = {
        headers: req.headers,
        url: url,
        method: req.method
    }

    let outboundResponse = request(options)
    req.pipe(outboundResponse)
    req.pipe(logStream, {end: false})

    // log the response
    outboundResponse.pipe(logStream, {end: false})
    outboundResponse.pipe(res)
}).listen(8002)
