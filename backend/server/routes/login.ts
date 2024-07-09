import express from 'express';
const router = express.Router();
import { Web3 } from 'web3';
import { get } from '../utils/axios';

// private RPC endpoint 
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');


const privateKey = '5d095bebfab1fef33090043584d6164121b3ef0d7b212cead0ecae1645bd220a'
const APIKEYTOKEN = '8VNJMISHR8686CBDQQXH2RCQMR984874P5'
const receiver = '0xDa346DB9DD9BfDA59BF9BAA2E9E6b0743eC65Ea4';
router.post('/api/claim', async (req, res) => {
    let inputs = req.body;
    console.log(inputs)
    let userAccount = inputs.userAccount;
    let amount = inputs.amount as number;
    // Chuyển token
    // let contractABI: any = await get(`https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=0x203C170E767686C459C92fc9FB5CbBC464F77b76&apikey=${APIKEYTOKEN}`)

    // const nonce = await web3.eth.getTransactionCount(userAccount, 'latest');

    // const contract = new web3.eth.Contract(JSON.parse(contractABI.result), userAccount);
    // const gasPrice = await web3.eth.getGasPrice();
    // const transaction = {
    //     'from': userAccount,
    //     'to': "0xAE1116ba1f95E14EA7644344Ca44664fE21c44b7",
    //     'gas': 100000,
    //     'nonce': nonce,
    //     gasPrice: gasPrice,
    //     data: contract.methods.mint(userAccount, 100).encodeABI(),
    // };

    // Chuyển coin
    const gasPrice = await web3.eth.getGasPrice();
    const transaction = {
        'from': userAccount,
        'to': receiver,
        'gas': 2000000,
        gasPrice: gasPrice,
        value: web3.utils.toWei(amount, 'ether'),
    };
    try {
        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
        if (!signedTx.rawTransaction) {
            throw Error("Singed transaction is invalid")
        }
        console.log(signedTx)
        let rs = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(rs)
        return res.send({
            code: 1,
            message: "ok",
            data: rs
        })
    } catch (error) {
        console.log(error)
        return res.send({
            code: 0,
            message: "password or username wrong!"
        })
    }
})
export { router as loginRouter }