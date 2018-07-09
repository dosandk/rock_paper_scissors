import Web3 from 'web3';
import contract from 'truffle-contract';
import Game from '../../app/build/contracts/Game.json';

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(Web3.givenProvider || provider);
const game = contract(Game);

game.setProvider(web3.currentProvider);

game.deployed().then(instance => {
  console.error('instance', instance);

  instance.getCurrentPrice.call()
    .then(price => console.error('price', price.toNumber()))
    .catch(error => console.error('Error: ', error));
});
