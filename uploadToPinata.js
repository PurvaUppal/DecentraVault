require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;
const pinataJWT = process.env.PINATA_JWT;

async function uploadToPinata(filePath) {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    let data = new FormData();
    data.append("file", fs.createReadStream(filePath));

    let config = {
        method: "post",
        url: url,
        headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
            Authorization: `Bearer ${pinataJWT}`
        },
        data: data
    };

    try {
        const response = await axios(config);
        console.log("File uploaded successfully: ", response.data);
        return response.data.IpfsHash; // Returns the IPFS hash
    } catch (error) {
        console.error("Error uploading file: ", error);
    }
}

// Example: Call function to upload a file
uploadToPinata("test.txt"); // Replace with your file path
