'use strict'

let server = require('../index.js')
let supertest = require('supertest')
let assert = require('assert')

describe('Proxy server', () => {
    it('should perform echo service', (done) => {
        supertest(server)
        .get('/')
        .expect(200, (err, res) => {
            assert.ifError(err)
            console.log(res.body)
            done()
        })
    })
})
