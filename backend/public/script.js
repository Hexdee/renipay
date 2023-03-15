var reniAddress = "0x539cc5c501F3c1797849BD85f6d6137be922be15";
var reniAbi = [{ "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amountInUSD", "type": "uint256" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_description", "type": "string" }, { "internalType": "string", "name": "_merchant", "type": "string" }], "name": "makePayment", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amountInUSD", "type": "uint256" }, { "internalType": "address", "name": "_token", "type": "address" }], "name": "requiredTokenAmount", "outputs": [{ "internalType": "uint256", "name": "_tokenAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
var erc20Abi = [{ "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
var address0 = "0x0000000000000000000000000000000000000000";
var weth = "0x5B67676a984807a212b1c59eBFc9B3568a474F0a"

// https://docs.walletconnect.com/quick-start/dapps/web3-provider
var provider = new WalletConnectProvider.default({
    rpc: {
        //1: "https://cloudflare-eth.com/", // https://ethereumnodes.com/
        //137: "https://polygon-rpc.com/", // https://docs.polygon.technology/docs/develop/network-details/network/
        80001: "https://rpc-mumbai.maticvigil.com/",
        // ...

    },
    // bridge: 'https://bridge.walletconnect.org',
});

document.getElementById("token").addEventListener("change", async (e) => {
    //
    const requiredTokenValue = 1;
    const tokenAddress = e.target.value;
    const tokenContract = await contract(erc20Abi, tokenAddress);
    try {
        const allowance = Number(await tokenContract.methods.allowance(account, reniAddress).call());
        const payBtn = document.getElementById("pay");
        const approveBtn = document.getElementById("approve");
        if (allowance < requiredTokenValue) {
            payBtn.style.display = "none";
            approveBtn.style.display = "block"
        } else {
            payBtn.style.display = "block";
            approveBtn.style.display = "none"
        }
    } catch (error) {
        console.log(error);
    }
})

const setFrom = () => {
    document.getElementById("from").value = account;
}

const getTokens = async () => {
    try {
        const url = new URL(`https://deep-index.moralis.io/api/v2/${account}/erc20?chain=mumbai`);
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': '4QdwNluHelpTw9qmoAXTsaodpYXP1E1cpdrRmqbTGf9sPhO9hBFPrRydJxkl5TPP'
            }
        })
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const setTokens = async (tokens) => {
    document.getElementById("token").innerHTML =
        tokens.map((token) => {
            return `<option value="${token.token_address}">${token.symbol}</option>`
            // }
        })
}

const setPortfolio = async (tokens) => {
    let tokensElement = "";
    tokens.map((tkn) => {
        let balance = tkn.balance / 10e18;
        if (balance < 0.01) {
            balance = balance.toFixed(4)
        } else {
            balance = balance.toFixed(2)
        }
        tokensElement += `<div class="token">
            <div class="token-img"></div>
            <p><strong>${(balance)} ${tkn.symbol}</strong></p>
            </div>`
    })
    document.querySelector(".tokens").innerHTML = tokensElement;
}

const init = async (account) => {
    if (account) {
        window.account = account;
        const matic = {
            symbol: "MATIC",
            token_address: address0,
            balance: Number(await window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] }))
        }

        const tokens = [matic, ...(await getTokens(account))];
        setFrom();
        setTokens(tokens);
        setPortfolio(tokens);
        // document.querySelector(".connect").style.display = "none";
    }
}

const connect = async () => {
    // if(window.account) {
    //     disconnect();
    //     return;
    // }
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        init(account);
        web3 = new Web3(window.ethereum);
        window.w3 = web3;
        try {
            // check if the chain to connect to is installed
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x13881' }], // chainId must be in hexadecimal numbers
            });
        } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: "0x13881",
                                chainName: "Polygon Testnet",
                                nativeCurrency: { name: "Polygon Token", symbol: "MATIC", decimals: 18 },
                                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                                iconUrls: ["future"],
                            }
                        ],
                    });
                } catch (addError) {
                    console.error(addError);
                    window.alert('failed to add network to metamask');
                    return;
                }
            } else {
                console.log(error);
                window.alert('failed to switch network to polygon testnet')
                return;
            }
            window.ethereum.on('accountsChanged', function (accounts) {
                init(accounts[0]);
            });
        }
    } else {
        if (provider.connected) {
            await provider.disconnect();
        }
        await provider.enable();

        //  Create Web3 instance
        const web3 = new Web3(provider);
        window.w3 = web3;
        const accounts = await web3.eth.getAccounts(); // get all connected accounts
        const account = accounts[0];
        console.log(await web3.eth.getChainId())
        init(account);
        provider.on("accountsChanged", (accounts) => {
            init(accounts[0])
        });
    }
    // document.getElementById("connect").innerText = "Disconnect ";
}

// const sign = async (msg) => {
//     if (w3) {
//     return await w3.eth.personal.sign(msg, account);
//     } else {
//         return false
//     }
// }

const contract = async (abi, address) => {
    if (w3) {
        return new w3.eth.Contract(abi, address)
    } else {
        return false
    }
}

var disconnect = async () => {
    if (provider.connected) {
        // Close provider session
        await provider.disconnect();
    }
}

const approveToken = async () => {
    const tokenAddress = document.getElementById("token").value;
    const payBtn = document.getElementById("pay");
    const approveBtn = document.getElementById("approve");
    try {
        approveBtn.innerText = "Loading...";
        const tokenContract = await contract(erc20Abi, tokenAddress);
        const tx = await tokenContract.methods.approve(reniAddress, "0xffffffffffffffffffffffffffffffff").send({ from: account });
        await tx.wait;
        payBtn.style.display = "block";
        approveBtn.style.display = "none";
    }
    catch (err) {
        console.log(err);
        alert("An error occured");
    } finally {
        approveBtn.innerText = "Approve";
    }
}

const requiredTokenAmount = async (token, amountInUSD) => {
    const reni = await contract(reniAbi, reniAddress);
    const amount = await reni.methods.requiredTokenAmount(web3.utils.toWei(amountInUSD), token).call();
    return amount;
}

const makePayment = async () => {
    const token = document.getElementById("token").value;
    const amount = document.getElementById("amount").value;
    const merchant = document.getElementById("to").value;
    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;
    const payBtn = document.getElementById("pay");

    if (token && name && amount && desc) {
        try {
            payBtn.innerText = "Loading..."
            const reni = await contract(reniAbi, reniAddress);
            if (token != address0) {
                const tx = await reni.methods.makePayment(token, web3.utils.toWei(amount), name, desc, merchant).send({ from: account });
                await tx.wait;
            } else {
                const requireAmount = await requiredTokenAmount(weth, amount);
                console.log({ requireAmount });
                const tx = await reni.methods.makePayment(token, web3.utils.toWei(amount), name, desc, merchant).send({ from: account, value: requireAmount });
            }
            // alert("Payment successful");
            payBtn.innerText = "Payment successful";
            payBtn.onclick = "";
            payBtn.style.backgroundColor = "green";
        } catch (err) {
            console.log(err);
            alert("An error occured");
            payBtn.innerText = "Pay with Reni";
        }
    } else if (!amount) {
        alert("Enter amount to be paid");
    } else if (!name) {
        alert("Enter your name")
    } else if (!desc) {
        alert("Enter description");
    }
    else {
        alert("Please select a token");
    }
}