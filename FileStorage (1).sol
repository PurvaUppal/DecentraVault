// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    struct File {
        string fileName;
        string ipfsHash;
        address owner;
    }

    mapping(address => File[]) private userFiles;
    event FileUploaded(address indexed owner, string fileName, string ipfsHash);

    function uploadFile(string memory _fileName, string memory _ipfsHash) public {
        userFiles[msg.sender].push(File(_fileName, _ipfsHash, msg.sender));
        emit FileUploaded(msg.sender, _fileName, _ipfsHash);
    }

    function getFiles() public view returns (File[] memory) {
        return userFiles[msg.sender];
    }

    function getAllFiles(address _user) public view returns (File[] memory) {
    return userFiles[_user];
}

function getFileCount() public view returns (uint) {
    return userFiles[msg.sender].length;
}


}



