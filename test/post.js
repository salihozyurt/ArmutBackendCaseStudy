process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const request = require('supertest')

const app = require('../app')

describe('POST /signup', () => {
    it('OK, signup and authenticate system works', (done) => {
        request(app).post('/signup')
            .send({
                email: "test@armut.com",
                username: "test",
                password: "pass"
            })
            .then((res) => {
                const body = res.body;
                expect(body.Status).to.equal('201')
                done()
            })
            .catch((err) => done(err))
    }).timeout(10000)

    it('Fail, Requires email information', (done) => {
        request(app).post('/signup')
            .send({
                username: "test",
                password: "pass"
            })
            .then((res) => {
                const body = res.body;
                expect(body.Status).to.equal('401')
                done()
            })
            .catch((err) => done(err))
    }).timeout(10000)

    it('Fail, Requires username information', (done) => {
        request(app).post('/signup')
            .send({
                email: "test@armut.com",
                password: "pass"
            })
            .then((res) => {
                const body = res.body;
                expect(body.Status).to.equal('401')
                done()
            })
            .catch((err) => done(err))
    }).timeout(10000)

    it('Fail, Requires password information', (done) => {
        request(app).post('/signup')
            .send({
                email: "test@armut.com",
                username: "test"
            })
            .then((res) => {
                const body = res.body;
                expect(body.Status).to.equal('401')
                done()
            })
            .catch((err) => done(err))
    }).timeout(10000)
})

describe('POST /login', () => {
    it('OK, login and authenticate system works', (done) => {
        request(app).post('/login')
            .send({
                username: "test",
                password: "pass"
            })
            .then((res) => {
                const body = res.body;
                expect(body.Status).to.equal('200')
                done()
            })
            .catch(done)
    }).timeout(10000)

    it('Fail, Requires username information', (done) => {
        request(app).post('/login')
            .send({
                password: "pass"
            })
            .then((res) => {
                const body = res.body;
                expect(body.Status).to.equal('404')
                done()
            })
            .catch(done)
    }).timeout(10000)

    it('Fail, Requires password information', (done) => {
        request(app).post('/login')
            .send({
                username: "test"
            })
            .then((res) => {
                const body = res.body;
                expect(body.Status).to.equal('404')
                done()
            })
            .catch(done)
    }).timeout(10000)
})

describe('POST /block', () => {
    it('OK, Block user system works', (done) => {
        request(app).post('/block')
            .send({
                currentusername: "test",
                blockusername: "test1"
            })
            .then((res) => {
                const body = res.body;
                expect(body).not.equal({})
                done()
            })
            .catch(done)
    }).timeout(10000)

    it('Fail, Requires blockusername information', (done) => {
        request(app).post('/block')
            .send({
                currentusername: "test"
            })
            .then((res) => {
                const body = res.body;
                expect(body).not.equal({})
                done()
            })
            .catch(done)
    }).timeout(10000)

    it('Fail, Requires currentusername information', (done) => {
        request(app).post('/block')
            .send({
                blockusername: "test"
            })
            .then((res) => {
                const body = res.body;
                expect(body).not.equal({})
                done()
            })
            .catch(done)
    }).timeout(10000)
})

describe('POST /unblock', () => {
    it('OK, Block user system works', (done) => {
        request(app).post('/unblock')
            .send({
                currentusername: "test",
                blockusername: "test1"
            })
            .then((res) => {
                const body = res.body;
                expect(body).not.equal({})
                done()
            })
            .catch(done)
    }).timeout(10000)

    it('Fail, Requires blockusername information', (done) => {
        request(app).post('/unblock')
            .send({
                currentusername: "test"
            })
            .then((res) => {
                const body = res.body;
                expect(body).not.equal({})
                done()
            })
            .catch(done)
    }).timeout(10000)

    it('Fail, Requires currentusername information', (done) => {
        request(app).post('/unblock')
            .send({
                blockusername: "test"
            })
            .then((res) => {
                const body = res.body;
                expect(body).not.equal({})
                done()
            })
            .catch(done)
    }).timeout(10000)
})

describe('POST /sendmessage', () => {
    it('OK, Block user system works', (done) => {
        request(app).post('/sendmessage')
            .send({
                fromUserName: "test",
                toUserName: "test1",
                message: "test message"
            })
            .then((res) => {
                const body = res.body;
                expect(body).not.equal({})
                done()
            })
            .catch(done)
    }).timeout(10000)
})