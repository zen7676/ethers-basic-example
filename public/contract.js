const { ethers } = require("ethers");
const initialize = () => {
    let accounts;
    const onboardButton = document.getElementById('connectButton');
    const retrieveButton = document.getElementById('retrieveButton');
    const storeButton = document.getElementById('storeButton');
    const messageStatus = document.getElementById('messageStatus');
    const inputMessage = document.getElementById('inputMessage');
    const accountsDiv = document.getElementById('accounts');
    let myContract;
    //enter deployed contract abi
    const ContractAbi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "msg_in",
                    "type": "string"
                }
            ],
            "name": "store",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "retrieve",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const ContractAddress = "0x***"; //enter deployed contract address

    const isMetaMaskConnected = () => accounts && accounts.length > 0

    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    const onClickConnect = async () => {
        try {
            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })
            accounts = newAccounts;
            accountsDiv.innerHTML = accounts;
            if (isMetaMaskConnected()) {
                retrieveButton.disabled = false;
                retrieveButton.onclick = onClickRetrieve;
                storeButton.disabled = false;
                storeButton.onclick = onClickStore;
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner(0);
                myContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onClickRetrieve = async () => {
        try {
            let res = await myContract.retrieve();
            messageStatus.innerHTML = res;
        } catch (error) {
            console.error(error);
        }
    }
    const onClickStore = async () => {
        try {
            let message = inputMessage.value;
            myContract.store(message);
            messageStatus.innerHTML = 'Your message has been sent';
        } catch (error) {
            console.error(error);
        }
    }

    const MetaMaskClientCheck = () => {
        if (!isMetaMaskInstalled()) {
            onboardButton.innerText = 'Please install MetaMask';
        } else {
            onboardButton.innerText = 'Connect';
            onboardButton.onclick = onClickConnect;
            onboardButton.disabled = false;
        }
    };
    MetaMaskClientCheck();
};
window.addEventListener('DOMContentLoaded', initialize)