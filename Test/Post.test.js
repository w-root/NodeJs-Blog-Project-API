const chai = require("chai")
const expect = require("chai").expect
const chaiHttp = require("chai-http")
chai.use(chaiHttp)
const server = require("../index")


describe('GET : Posts Group', () => {
    it("Should add tag and return response status code 200", done => {
        chai.request(server)
            .get("/posts")
            .end((error, response) => {
                expect(response.status).to.equal(200)
                done()
            })
    })
    it("Should get post by slug return response status code 200 ", done => {
        let slug = "router-javascript-react"
        chai.request(server)
            .get(`/posts/${slug}`)
            .end((error, response) => {
                expect(response.status).to.equal(200)
                done()
            })
    })

})
