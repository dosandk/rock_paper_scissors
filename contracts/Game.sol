pragma solidity ^0.4.23;

contract Game {
  uint public price = 0.5 ether;
  uint public bank = 0;
  uint public gameDuration = 10*60*60*1000;

  uint commission = 0;
  uint startGameTime = 0;

  event Joining(
    address _from,
    uint _id,
    string figure
  );

  event FinishGame(
    string status
  );

  event GameFinished(
    string status
  );

  struct Player {
    string figure;
    uint joiningTime;
    bool existed;
  }

  Player[] public players;

  mapping(address => uint) addressToId;
  mapping(address => uint) addressToValue;
  mapping(uint => address) idToAddress;

  function join(string _figure) external payable {
    // TODO: check if player already was joined
    // Question: I want to check if player already was joined via addressToId mapping
    require(addressToValue[msg.sender] == 0);
    require(msg.value >= price);
    uint id = players.push(Player(_figure, now, true)) - 1;

    emit Joining(msg.sender, id, _figure);

    addressToId[msg.sender] = id;
    addressToValue[msg.sender] = msg.value;
    idToAddress[id] = msg.sender;

    bank += msg.value;
    // TODO: add logic for game start
     if (msg.value > price) {
       // startGameTime = now;
       price = msg.value;
     }
  }

  function finishGame() public {
    msg.sender.send(addressToValue[msg.sender]);

    emit GameFinished('Game was finished');
    // TODO: reset default values
    // TODO: share bank across winners
  }

  // Getters
  function getPlayerObject() external view returns (string, uint) {
    uint id = addressToId[msg.sender];

    return (players[id].figure, players[id].joiningTime);
  }

  function getPlayersCount() external view returns (uint) {
    return players.length;
  }

  // TODO: call this function
  //  function getTimeLeft(uint timestamp) external view returns(uint) {
  //    return timestamp - startGameTime;
  //  }
  //
  //  function setStartGameTime(uint timestamp) external {
  //    startGameTime = timestamp;
  //  }

  function findWinners() {
    // TODO: find winners
    // case 1: share bank across all "rocks"
    // case 2: share bank across all "papers"
    // case 3: share bank across all "scissors"
    // case 4: draw!
  }

  function shareBank() {
    // TODO: implement
  }

  // TODO: Throws error. Maybe it should be modifier!
  // Error: VM Exception while processing transaction: invalid opcode
  // function isPlayerExist() public returns(bool) {
  //   uint id = addressToId[msg.sender];
  //   bool isExisted = players[id].existed;
  //
  //   return isExisted;
  // }
}
