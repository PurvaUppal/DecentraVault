import Web3 from "web3";

let web3;
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: "eth_requestAccounts" });
} else {
    console.log("MetaMask not detected! Install MetaMask.");
}

const contractAddress = "0xc27363bf1a69c67268a7e97f1ee860a8eaa2cb771005046495bea852ff40fc55"; // Replace with actual contract address

const contractABI = [
    {
        "inputs": [
            { "internalType": "string", "name": "_fileName", "type": "string" },
            { "internalType": "string", "name": "_ipfsHash", "type": "string" }
        ],
        "name": "uploadFile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getFiles",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "fileName", "type": "string" },
                    { "internalType": "string", "name": "ipfsHash", "type": "string" },
                    { "internalType": "address", "name": "owner", "type": "address" }
                ],
                "internalType": "struct FileStorage.File[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

export { web3, contract };
