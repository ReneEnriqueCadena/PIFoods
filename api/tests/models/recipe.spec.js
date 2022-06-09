const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
    describe('healthyfoodlevel' , ()=>{
      it('should throw an error if healthyfoodlevel is wrong' , (done)=> {
        Recipe.create({ name: 'Soup test', dishsummary: 'dish text', healthyfoodlevel: 'Invalid data type'})
        .then(() => done(new Error('It requires a valid type')))
        .catch(() => done());
      });
      it('should work when its a valid healthyfoodlevel', (done) => {
        Recipe.create({ name: 'Test', dishsummary: 'dish text', healthyfoodlevel: 12 })
        .then(() => {
          Recipe.findOne({
            where: {
              name: 'Test',
            },
          })
          .then(recipe => {
            expect(recipe.name).to.equal('Test')
            expect(recipe.healthyfoodlevel).to.equal(12)
            done()
          })
          .catch(() => done(new Error('It requires a valid healthyfoodlevel')))
        })
      })
    });
  });
});
