export const checkIfWalletIsConnected = async () => {
    try {

        const {ethereum} = window;

        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }

        const accounts = await ethereum.request({method: "eth_accounts"})


        return accounts.length !== 0 ? accounts[0] : null
    } catch (e) {
        console.log(e)
    }

};


export const connectWallet = async (handleAccount) => {

    const {ethereum} = window;


    if (!ethereum) {
        console.log("Make sure you have metamask!");
        return
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected", accounts[0]);
    handleAccount(accounts[0])
}



