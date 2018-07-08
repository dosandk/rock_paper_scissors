const Game = artifacts.require('Game');

contract('Game', accounts => {
  it('getAllPlayers:: should return 10 value', () => {
    return Game.deployed()
      .then(instance => instance.getAllPlayers())
      .then(data => assert.equal(data, 10, 'was returned another value'));
  });

  xit('join:: should add player to game', () => {
    // TODO: rethink this!
    // const [accountOne] = accounts;
    // return Game.deployed()
    //   .then(instance => instance.join('rock', {from: accountOne, value: 1}))
    //   .then(() => assert.equal(instance.getBankValue(), 1, ''))
  });

  it('getBankValue:: should return bank value', () => {
    return Game.deployed()
      .then(instance => instance.getBankValue())
      .then(data => assert.equal(data, 0, 'bunk must be empty!'))
  });
});
