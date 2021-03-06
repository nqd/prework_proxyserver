'use strict'

let server = require('../index.js')
// let supertest = require('supertest')
let assert = require('assert')
let request = require('request')

// we are using self signed cert
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

describe('Proxy server', () => {
    it('should perform echo service with get', (done) => {
        request('http://localhost:8001/abc', (err, res, body) => {
            assert.ifError(err)
            assert.equal(res.statusCode, 200)
            assert.equal(body, '')
            done()
        })
    })
    it('should perform echo service with post', (done) => {
        // with form: Content-type: application/x-www-form-urlencoded
        request.post({url:'http://localhost:8001/abc',
            form: {key:'value'}},
            (err, res, body) => {
                assert.ifError(err)
                assert.equal(res.statusCode, 200)
                assert.equal(body, 'key=value')
                done()
            }
        )
    })
    it('should perform https echo service with get', (done) => {
        request('https://localhost:8002/abc', (err, res, body) => {
            assert.ifError(err)
            assert.equal(res.statusCode, 200)
            assert.equal(body, '')
            done()
        })
    })
    it('should perform https echo service with post', (done) => {
        // with form: Content-type: application/x-www-form-urlencoded
        request.post({url:'https://localhost:8002/abc',
            form: {key:'value'}},
            (err, res, body) => {
                assert.ifError(err)
                assert.equal(res.statusCode, 200)
                assert.equal(body, 'key=value')
                done()
            }
        )
    })
})
