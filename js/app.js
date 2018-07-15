import Web3 from 'web3';
import contract from 'truffle-contract';
import Game from '../build/contracts/Game.json';

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(provider);

const game = contract(Game);
game.setProvider(web3.currentProvider);

const toWei = (amount, value) => web3.toWei(amount, value);
const getAccounts = () => new Promise((resolve, reject) => {
  web3.eth.getAccounts((error, accounts) => {
    return error ? reject() : resolve(accounts);
  });
});

const getElementById = id => document.getElementById(id);

const buildOptions = arr => {
  const selectBox = getElementById('select-box');
  const select = document.createElement('select');
  select.id = 'address-selector';

  arr.forEach((item, index) => {
    const el = document.createElement('option');
    el.value = item;
    el.textContent = item;
    if (index === 0) el.checked = true;
    select.appendChild(el);
  });

  selectBox.appendChild(select)
};

export const initializeClient = async () => {
  return new Promise(async resolve => {
    // TODO: uncomment this after implementation in contract
    // const $gameDuration = getElementById('game-duration');
    const $contractAddress = getElementById('contract-address');
    const $playersCounter = getElementById('players-counter');
    const $gameBank = getElementById('game-bank');
    const $submitBtn = getElementById('submit-btn');
    const $finishBtn = getElementById('finish-btn');

    const getFigureValue = () => {
      const $radioBtns = document.getElementsByClassName('figure-input');

      return Array.from($radioBtns).find(item => item.checked).value;
    };

    const instance = await game.deployed();
    const accounts = await getAccounts();

    buildOptions(accounts);
    $contractAddress.textContent = instance.address;

    // Contract listeners
    instance.Joining().watch((error, result) => {
      if (!error) console.error('Player joined to game', result);
    });

    instance.GameFinished().watch((error, result) => {
      if (!error) console.error('Game have finished', result);
    });

    // Client listeners
    $submitBtn.addEventListener('click', async () => {
      const figure = getFigureValue();
      const $price = getElementById('price');
      const addressSelector = getElementById('address-selector');
      const address = addressSelector.options[addressSelector.selectedIndex].value;
      const transaction = {
        from: address,
        value: toWei($price.value, 'ether'),
        gas: 3000000
      };

      try {
        await instance.join(figure, transaction);
        const playersCount = await (await instance.getPlayersCount()).toNumber();
        const bank = await (await instance.bank()).toNumber();

        $playersCounter.textContent = playersCount;
        $gameBank.textContent = web3.fromWei(bank, 'ether');
      } catch (error) {
        console.error('error', error.message);
      }
    });

    $finishBtn.addEventListener('click', async () => {
      try {
        await instance.finishGame({from: accounts[0]});
      } catch (error) {
        console.error('error', error.message);
      }
    });

    resolve();
  });
};
