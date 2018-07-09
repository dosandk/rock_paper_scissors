pragma solidity ^0.4.23;

contract Game {
    uint price = 0.5 ether;
    uint bank = 0;
    uint timeMark;

    struct Player {
        string figure;
        uint joiningTime;
    }

    mapping (address => Player) addressToPlayer;

    function join(string _figure) external {
        addressToPlayer[msg.sender] = Player(_figure, now);
    }

    // Setters
    // TODO: remove "public" modifier
    function setPrice(uint _price) public {
        price = _price;
    }

    // Getters
    function getPlayerObject() external view returns(string, uint) {
        return (addressToPlayer[msg.sender].figure, addressToPlayer[msg.sender].joiningTime);
    }

    function getFigure() external view returns(string) {
        return addressToPlayer[msg.sender].figure;
    }

    function getAllPlayers() external view returns(uint) {
        uint playersCount = 10;
        return playersCount;
    }

    function getBankValue() external view returns(uint) {
        return bank;
    }

    function getCurrentPrice() external view returns(uint) {
        return price;
    }
}
