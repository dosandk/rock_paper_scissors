pragma solidity ^0.4.23;

contract Game {
  uint price = 0.5 ether;
  uint bank = 0;
  uint commission = 0;
  uint timeMark = 0;

  struct Player {
    string figure;
    uint joiningTime;
  }

  Player[] public players;

  mapping(address => uint) addressToId;
  mapping(uint => address) idToAddress;

  function finishGame() {
    timeMark = 0;
    price = 0.5 ether;
    // TODO: share bank across winners
  }

  // TODO: call this function
  function getTimeLeft(uint timestamp) external view returns(uint) {
    return timestamp - timeMark;
  }

  function findWinners() {
    // TODO:
  }

  // TODO: add payable modifier for this function
  function join(string _figure) external payable {
    uint id = players.push(Player(_figure, now)) - 1;

    addressToId[msg.sender] = id;
    idToAddress[id] = msg.sender;

    if (timeMark == 0 && msg.value > 0 ether) {
      timeMark = now;
      price = msg.value;
    }
  }

  // Getters
  function getPlayerObject() external view returns (string, uint) {
    uint id = addressToId[msg.sender];

    return (players[id].figure, players[id].joiningTime);
  }

  function getPlayersCount() external view returns (uint) {
    return players.length;
  }

  function getBankValue() external view returns (uint) {
    return bank;
  }

  function getCurrentPrice() external view returns (uint) {
    return price;
  }
}
