document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }

    // Load existing files and folders in the dashboard
    loadFolders();
    loadFiles();

    // Handle file upload
    document.getElementById('uploadBtn').addEventListener('click', uploadFile);

    // Handle logout
    document.getElementById('logout').addEventListener('click', logout);
});

// Function to check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}

// Function to load folders
function loadFolders() {
    const foldersSection = document.getElementById('folders');
    const folders = JSON.parse(localStorage.getItem('folders')) || ['Folder 1', 'Folder 2', 'Folder 3'];

    foldersSection.innerHTML = ''; // Clear previous folders

    folders.forEach(folder => {
        const folderDiv = document.createElement('div');
        folderDiv.className = 'folder';
        folderDiv.textContent = folder;
        folderDiv.addEventListener('click', () => openFolder(folder));
        foldersSection.appendChild(folderDiv);
    });
}

// Function to open a folder (currently placeholder)
function openFolder(folderName) {
    alert(`Opening ${folderName}`);
}

// Function to load files in "Your Files" section
function loadFiles() {
    const filesSection = document.getElementById('files');
    const files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

    filesSection.innerHTML = ''; // Clear previous file list

    if (files.length === 0) {
        filesSection.innerHTML = '<p>No files uploaded yet.</p>';
    } else {
        files.forEach(file => {
            const fileDiv = document.createElement('div');
            fileDiv.className = 'file-item';
            fileDiv.textContent = file.name;
            fileDiv.addEventListener('click', () => downloadFile(file.url));
            filesSection.appendChild(fileDiv);
        });
    }
}

// Function to handle file upload
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileData = {
                name: file.name,
                url: e.target.result // This is a temporary solution; use IPFS for actual file storage
            };

            let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
            uploadedFiles.push(fileData);
            localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

            alert(`${file.name} uploaded successfully!`);
            loadFiles(); // Refresh file list
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a file to upload.');
    }
}

// Function to simulate file download
function downloadFile(fileUrl) {
    window.open(fileUrl, '_blank');
}

// Function to handle logout
function logout() {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
}

import { web3, contract } from "./contractConfig.js";

// Function to Upload File
async function uploadFileToBlockchain(fileName, ipfsHash) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.uploadFile(fileName, ipfsHash).send({ from: accounts[0] });
        alert("File uploaded successfully!");
        displayFiles(); // Refresh file list after upload
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}

// Function to Fetch Uploaded Files
async function displayFiles() {
    try {
        const files = await contract.methods.getFiles().call();
        let fileList = document.getElementById("file-list");
        fileList.innerHTML = "";
        files.forEach(file => {
            let fileItem = document.createElement("li");
            fileItem.innerHTML = `<strong>${file.fileName}</strong> - <a href="https://ipfs.io/ipfs/${file.ipfsHash}" target="_blank">View</a>`;
            fileList.appendChild(fileItem);
        });
    } catch (error) {
        console.error("Error fetching files:", error);
    }
}

// Event Listener for File Upload
document.getElementById("upload-btn").addEventListener("click", async function () {
    let fileName = document.getElementById("file-name").value;
    let ipfsHash = document.getElementById("file-ipfs").value; // Assume IPFS hash is entered manually for now
    if (fileName && ipfsHash) {
        await uploadFileToBlockchain(fileName, ipfsHash);
    } else {
        alert("Please enter file name and IPFS hash.");
    }
});




document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Stop the default form submission

        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;

        if (email && password) {
            // Simulate successful login (replace with actual validation later)
            alert("Login successful!");
            window.location.href = "index.html"; // Redirect to dashboard
        } else {
            alert("Please enter valid login credentials.");
        }
    });
});




// Load files on page load
window.onload = displayFiles;


 



  