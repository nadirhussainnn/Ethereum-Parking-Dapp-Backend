const dotenv=require('dotenv')
dotenv.config()


const Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");

const ParkingABI = require("../ABI.json");
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const INFURANET_URL= process.env.INFURANET_URL;
const web3 = new Web3(INFURANET_URL);

const sendTransaction=(req, res)=>{

  console.log(req.body)
    const {senderPublicKey, senderPrivateKey,receiverPublicKey, amount}=req.body
    //Signing Transaction
    const privateKey = Buffer.from(
      senderPrivateKey.substring(2, senderPrivateKey),
      "hex"
    );
  
    //get nonce and create transaction object
    web3.eth.getTransactionCount(senderPublicKey, (error, count) => {
      const txObject = {
        nonce: web3.utils.toHex(count),
        to: receiverPublicKey,
        value: web3.utils.toHex(web3.utils.toWei(amount, "ether")),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      };
  
      const transaction = new Tx(txObject, { chain: "ropsten" });
      transaction.sign(privateKey);
      const serializedTransaction = transaction.serialize();
      const raw = "0x" + serializedTransaction.toString("hex");
  
      // console.log(raw)
      //Broadcast the transaction
      web3.eth.sendSignedTransaction(raw, (error, transactionHash) => {
        if (error) {
          console.log("\n\n" + error);
          res.send("Error Occured");
        } else {
          console.log("Updation tHash " + transactionHash);
          res.send(JSON.stringify({ transactionHash: transactionHash }));
        }
      });
    });
}


const updateVacancy=(req, res)=>{

    console.log(`Update Vacancy API hit`, req.body)

    const {senderPrivateKey, senderPublicKey, lotId}=req.body  
  
    //Signing Transaction
    const privateKey = Buffer.from(
      senderPrivateKey.substring(2, senderPrivateKey),
      "hex"
    );
    //Update vacancy for this lot, make another transaction indeed
  
    const contract = new web3.eth.Contract(ParkingABI, CONTRACT_ADDRESS);
  
    web3.eth.getTransactionCount(senderPublicKey, (error, transactionCount) => {
      const data = contract.methods.setLotVacancy(lotId).encodeABI();
  
      const txObject = {
        nonce: web3.utils.toHex(transactionCount + 1),
        to: CONTRACT_ADDRESS,
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
        data: data,
      };
  
      const transaction = new Tx(txObject, { chain: "ropsten" });
      transaction.sign(privateKey);
      const serializedTransaction = transaction.serialize();
      const raw = "0x" + serializedTransaction.toString("hex");
  
      web3.eth.sendSignedTransaction(raw, (error, transactionHash) => {
        if (error) {
          console.log("\n\n" + error);
          res.send("Error Occured While updating Lot vacancy");
        } else {
          console.log("Updation tHash " + transactionHash);
          res.send(JSON.stringify({ transactionHash: transactionHash }));
        }
      });
    });
}

const addParkingLot=(req, res)=>{

    console.log(`Add lot API hit`)

    const {ownerAddress, lotId, price, location, vacancy, description}=req.body
    const ownerPrivateKey = req.body.privateKey;
  
    //Signing Transaction
    const privateKey = Buffer.from(
      ownerPrivateKey.substring(2, ownerPrivateKey),
      "hex"
    );
  
    const contract = new web3.eth.Contract(ParkingABI, CONTRACT_ADDRESS);
  
    //get nonce and create transaction object
    web3.eth.getTransactionCount(ownerAddress, (error, count) => {
      //We pass contract method in our transaction
      const data = contract.methods
        .setParking(ownerAddress, lotId, price, location, description, vacancy)
        .encodeABI();
  
      const txObject = {
        nonce: web3.utils.toHex(count),
        to: CONTRACT_ADDRESS,
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
        data: data,
      };
  
      const transaction = new Tx(txObject, { chain: "ropsten" });
      transaction.sign(privateKey);
      const serializedTransaction = transaction.serialize();
      const raw = "0x" + serializedTransaction.toString("hex");
  
      // console.log(raw)
      //Broadcast the transaction
      web3.eth.sendSignedTransaction(raw, (error, transactionHash) => {
        if (error) {
          console.log("\n\n" + error);
          res.send("Error Occured");
        } else {
          console.log("Lot Added TransactionHash: " + transactionHash);
          res.send(JSON.stringify({ transactionHash: transactionHash }));
        }
      });
    });
}

module.exports={
    sendTransaction,
    addParkingLot,
    updateVacancy
}