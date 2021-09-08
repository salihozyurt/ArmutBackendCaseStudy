process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const request = require('supertest')

const app = require('../app')

describe('GET /logout', () => {
    it('OK, logout system works', (done) => {
        request(app).get('/logout')
            .then((res) => {
                const body = res.body;
                expect(body.Status).to.equal('200')
                done()
            })
            .catch(done)
    }).timeout(10000)
})

describe('GET /listblockedusers', () => {
    it('OK, list blocked users system works', (done) => {
        request(app).get('/listblockedusers').send({
            username: "test"
        })
            .then((res) => {
                const body = res.body;
                expect(body).not.equal({})
                done()
            })
            .catch(done)
    }).timeout(10000)

    it('Fail, Requires username information', (done) => {
        request(app).get('/listblockedusers')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).not.equal({})
                done()
            })
            .catch(done)
    }).timeout(10000)
})

describe('GET /getmessages', () => {
    it('OK, logout system works', (done) => {
        request(app).get('/getmessages')
            .send({
                username: "test"
            })
            .then((res) => {
                const body = res.body;
                expect(body).not.equal({})
                done()
            })
            .catch(done)
    }).timeout(10000)
})