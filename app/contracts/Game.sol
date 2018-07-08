pragma solidity ^0.4.23;

contract Game {
    uint price = 0.5 ether;
    uint bank = 0;

    mapping (address => string) figures;

    function join(string _figure) external payable {
        require(msg.value > price);
        figures[msg.sender] = _figure;
        bank += msg.value;
    }

    function getAllPlayers() external view returns(uint) {
        uint playersCount = 10;
        return playersCount;
    }

    function getBankValue() external view returns (uint) {
        return bank;
    }
}
