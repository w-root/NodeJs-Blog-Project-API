const mongoose = require('mongoose')
const chai = require("chai")
const expect = require("chai").expect
const chaiHttp = require("chai-http")
chai.use(chaiHttp)
const server = require("../index")


describe('POST : Tags Group', () => {
    it("Should add tag and return response status code 200", done => {
        let tag = {
            name: "Backend Test"
        }
        chai.request(server)
            .post("/tag/add")
            .send(tag)
            .end((error, response) => {
                expect(response.status).to.equal(200)
                done()
            })
    })
})
describe('GET : Tags Group', () => {
    it("Should get all tags and return response status code 200", done => {
        chai.request(server)
            .get("/tag")
            .end((error, response) => {
                expect(response.body.length).to.equal(1)
                expect(response.status).to.equal(200)
                done()
            })
    })

    after(() => {
        mongoose.connection.close()
    })
})

