const { MarkovMachine } = require("./markov");

describe('MarkovMachine', () => {
  describe('Instantiation', () => {
    it('should create a MarkovMachine instance', () => {
      const mm = new MarkovMachine('sample text');
      expect(mm).toBeInstanceOf(MarkovMachine);
    });

  });

  describe('makeChains()', () => {
    it('should create chains based on input text', () => {
      const mm = new MarkovMachine('sample text');
      expect(mm.chains.size).toBeGreaterThan(0);
    });

  });

  describe('choice()', () => {
    it('should return a random choice form an array', () => {
      const choices = ['a', 'b', 'c', 'd','e'];
      const choice = MarkovMachine.choice(choices);
      expect(choices).toContain(choice);
    });

  });

});
