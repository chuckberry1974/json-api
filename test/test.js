
var request = require('supertest');
var app = require('../server.js');
var expect = require('chai').expect;

describe('read-only', () => {
  it('should return json', done => {
    request(app)
      .get('/read-only')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });

it('should provide a list of all class participants', done => {
    request(app)
      .get('/read-only/participants')
      .expect(res => {
      console.log(res.body)
      expect(res.body.participants).to.be.an('array')
      expect(res.body.participants.length).to.equal(24)

    })
      .end(done)
})

it('should allow searching by name', done => {
    request(app)
      .get('/read-only/search/Cheryl Wee')
      .expect(res => {
      console.log(res.body)
      expect(res.body.instructors.length).to.equal(1)



    })
      .end(done)
})



});
