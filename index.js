'use strict'

let http = require('http')

http.createServer((req, res) => {
    for (let header in req.headers) {
        res.setHeader(header, req.headers[header])
    }
    req.pipe(res)
}).listen(8000)
