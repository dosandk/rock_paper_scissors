const Game = artifacts.require('Game');

contract('Game:', async (accounts) => {
  let instance;
  const [account1, account2, account3] = accounts;

  beforeEach(async () => {
    instance = await Game.new();
  });

  it('getAllPlayers:: should return 3 count', async () => {
    const value = web3.toWei(0.5, 'ether');

    await instance.join('rock', {from: account1, value, gas: 3000000,});
    await instance.join('paper', {from: account2, value, gas: 3000000,});
    await instance.join('paper', {from: account3, value, gas: 3000000,});

    const playersCount = await instance.getPlayersCount();

    assert.equal(playersCount.toNumber(), 3, 'must return the count equal 3');
  });

  it('public bank:: should return initial bank value', async () => {
      const contractBudget = await instance.bank();

      assert.equal(contractBudget, 0, 'bunk must be empty!');
  });

  it('public price:: should return initial price of joining to game', async () => {
      const price = await instance.price();

      assert.equal(price.toNumber(), web3.toWei(0.5, 'ether'), 'default price must be equal 0.5 ether');
  });

  it('public gameDuration:: should return game duration', async () => {
    const gameDuration = await instance.gameDuration();
    const min10 = 10*60*60*1000;

    assert.equal(gameDuration, min10, 'game duration must be equal 10 minutes');
  });

  contract('join:', async accounts => {
    let instance;
    const [account1, account2, account3] = accounts;

    beforeEach(async () => {
      instance = await Game.new();
    });

    it('player can join to the game only once', async () => {
      const value = web3.toWei(0.5, 'ether');
      await instance.join('rock', {from: account1, value});

      try {
        await instance.join('paper', {from: account1, value});
      } catch (error) {
        const expectedError = 'VM Exception while processing transaction: revert';

        assert.equal(error.message, expectedError, 'must revert transaction');
      }
    });

    it('should add player to game if he paid >= 0.5 ether', async () => {
      const value = web3.toWei(0.6, 'ether');
      await instance.join('rock', {from: account1, value});

      const playersCount = await instance.getPlayersCount();

      assert.equal(playersCount.toNumber(), 1, 'must return the count equal "1"');
    });

    it('should not add player to game if he paid < 0.5 ether', async () => {
      const value = web3.toWei(0.3, 'ether');

      // TODO: Question: how to test payable functions?
      try {
        await instance.join('rock', {from: account1, value});
      } catch (error) {
        const expectedError = 'VM Exception while processing transaction: revert';

        assert.equal(error.message, expectedError, 'must revert transaction');
      }
    });

    it('should add few players to game', async () => {
      const value = web3.toWei(0.5, 'ether');

      await instance.join('rock', {from: account1, value});
      await instance.join('paper', {from: account2, value});
      await instance.join('scissors', {from: account3, value});

      const playersCount = await instance.getPlayersCount();

      assert.equal(playersCount.toNumber(), 3, 'must return the count equal "3"');
    });

    it('should allow players set the figure', async () => {
      const value = web3.toWei(0.5, 'ether');
      await instance.join('rock', {from: account1, value});

      const player = await instance.getPlayerObject();
      const [figure] = player;

      assert.equal(figure, 'rock', 'contract must return value "rock"');
    });

    it('should start game and change game price', async () => {
      const price = web3.toWei(0.6, 'ether');

      await instance.join('rock', {from: account1, value: price});
      const currentPrice = await instance.price();

      assert.equal(currentPrice, price, 'game price must be updated');
    });

    // TODO: uncomment after after logic implementation in contract
    // it('should not change game price if game started', async () => {
    //   const value = web3.toWei(5, 'ether');
    //   await instance.join('rock', {from: account1, value});
    //   const currentPrice = await (await instance.price()).toNumber();
    //
    //   assert.equal(currentPrice, web3.toWei(0.5, 'ether'), 'game price must not be changed');
    // });

    // if ('should not join user to the game if price was lower 0.5 ether', async () => {
    //
    // });
  });

  // TODO: uncomment after logic implementation in contract
  // contract('finishGame:', async accounts => {
  //   let instance;
  //
  //   beforeEach(async () => {
  //     instance = await Game.new();
  //   });
  //
  //   if ('should share bank across winners', async () => {
  //
  //   });
  //
  //   if ('should transfer 5% from bank to the contract', async () => {
  //
  //   });
  //
  //   if ('should reset variables', async () => {
  //
  //   });
  // });
});
