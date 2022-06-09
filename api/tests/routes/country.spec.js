/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  dishsummary: 'dish test'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', (done) => {
      agent.get('/recipes')
        .expect(200)
        .end(done)
    });
    it('responds with an array', (done) => {
      agent.get('/recipes')
        .end(function (err, res) {
          expect(res.body).to.be.a('array')
          done()
        })
    });
    it('If the idquery is passed, should responds by that id', (done) => {
      agent.get('/recipes/1')
        .end(function (err, res) {
          expect(res.body[0].id).to.be.equal(1);
          done()
        })
    });
    it('Should responds by that id', (done) => {
      agent.get('/recipes/3')
        .end(function (err, res) {
          expect(res.body[0].id).to.be.equal(3);
          done()
        })
    });
  });
});