const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose
const mockgoose = new Mockgoose(mongoose)

const chai = require("chai")
const expect = require("chai").expect
const chaiHttp = require("chai-http")
chai.use(chaiHttp)
const server = require("../index")


describe('POST : Authentication', () => {
    before(() => {
        mockgoose.prepareStorage().then(() => {
            mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => console.log("Memory connected to database"))
                .catch(err => console.log(err))
        })
    })
    let registerUser = {
        username: "denemeveri",
        email: "denemeveri@gmail.com",
        password: "denemeveri123456"
    }
    let loginUser = {
        email: "denemeveri@gmail.com",
        password: "denemeveri123456"
    }
    it('Should register and return status code 200', done => {
        chai.request(server)
            .post('/auth/signup')
            .send(registerUser)
            .end((error, response) => {
                expect(response.status).to.equal(200)
                expect(response.body).to.have.property('message');
                done()
            })
    })

    it('Should login and return jwt token', done => {
        chai.request(server)
            .post('/auth/signin')
            .send(loginUser)
            .end((error, response) => {
                expect(response.body).to.have.property('token');
                expect(response.status).to.equal(200)
                done()
            })
    })

    it('Should return a status code of 404 because user is not found', done => {
        let loginUser = {
            email: "denemeveri2@gmail.com",
            password: "denemeveri123456"
        }
        chai.request(server)
            .post('/auth/signin')
            .send(loginUser)
            .end((error, response) => {
                chai.expect(response.status).to.equal(404)
                done()
            })
    })
})