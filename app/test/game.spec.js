const Game = artifacts.require('Game');

contract('Game:', async (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await Game.deployed();
  });

  it('getAllPlayers:: should return 10 value', async () => {
      const playersCount = await instance.getAllPlayers();

      assert.equal(playersCount, 10, 'was returned another value');
  });

  it('getBankValue:: should return bank value', async () => {
      const contractBudget = await instance.getBankValue();

      assert.equal(contractBudget, 0, 'bunk must be empty!');
  });

  it('getCurrentPrice:: should return price of joining to game', async () => {
      const price = await instance.getCurrentPrice();

      assert.equal(price.toNumber(), 5e+17, 'default price must be equal 0.5 ether');
  });

  it('setPrice:: should set price of the game', async () => {
    const price = 1e+18;
    await instance.setPrice(price);
    const currentPrice = await instance.getCurrentPrice();

    assert.equal(currentPrice.toNumber(), price, 'default price must be equal 0.5 ether');

  });

  contract('join:', async () => {
    let instance;

    beforeEach(async () => {
      instance = await Game.deployed();
    });

    it('should add one player to game', async () => {
      await instance.join('rock');

      const player = await instance.getPlayerObject();
      const [figure] = player;

      assert.equal(figure, 'rock', 'contract must return value "rock');
    });
  });
});
