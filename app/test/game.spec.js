const Game = artifacts.require('Game');

contract('Game:', async (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await Game.deployed();
  });

  it('getAllPlayers:: should return 10 value', async () => {
    await instance.join('rock');
    await instance.join('paper');
    await instance.join('paper');

    const playersCount = await instance.getPlayersCount();

    assert.equal(playersCount.toNumber(), 3, 'must return the count equal 3');
  });

  it('getBankValue:: should return bank value', async () => {
      const contractBudget = await instance.getBankValue();

      assert.equal(contractBudget, 0, 'bunk must be empty!');
  });

  it('getCurrentPrice:: should return price of joining to game', async () => {
      const price = await instance.getCurrentPrice();

      assert.equal(price.toNumber(), web3.toWei(0.5, 'ether'), 'default price must be equal 0.5 ether');
  });

  contract('join:', async accounts => {
    let instance;
    const [account] = accounts;

    beforeEach(async () => {
      instance = await Game.deployed();
    });

    it('should add few players to game', async () => {
      await instance.join('rock');
      await instance.join('paper');
      await instance.join('scissors');

      const playersCount = await instance.getPlayersCount();

      assert.equal(playersCount.toNumber(), 3, 'must return the count equal "3"');
    });

    it('should allow players set the figure', async () => {
      await instance.join('rock');

      const player = await instance.getPlayerObject();
      const [figure] = player;

      assert.equal(figure, 'rock', 'contract must return value "rock"');
    });

    it('should start game and change game price', async () => {
      const price = web3.toWei(0.6, 'ether');

      await instance.join('rock', {from: account, value: price});
      const currentPrice = await instance.getCurrentPrice();

      assert.equal(currentPrice, price, 'game price must be updated');
    });

    it('should not change game price if game started', async () => {
      const price = web3.toWei(5, 'ether');
      await instance.join('rock', {from: account, value: price});
      const currentPrice = await instance.getCurrentPrice();

      assert.equal(currentPrice, 0.6e+18, 'game price must not be changed');
    });
  });
});
