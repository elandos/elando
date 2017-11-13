"use strict"

const querystring = require('querystring');

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.eth_host}:8545`));

const path = require('path');
const TruffleContract = require('truffle-contract');
const MetaCoinJSON  = require(path.join(__dirname, 'contracts/MetaCoin.json'));

const MetaCoin = TruffleContract(MetaCoinJSON);
MetaCoin.setProvider(web3.currentProvider);

// MonkeyPatch
// https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
if (typeof MetaCoin.currentProvider.sendAsync !== "function") {
    MetaCoin.currentProvider.sendAsync = function() {
        return MetaCoin.currentProvider.send.apply(MetaCoin.currentProvider, arguments);
    };
}

module.exports = (context, callback) => {
    const body = querystring.parse(context);

    web3.eth.getAccounts((err, result) => {
        MetaCoin.deployed().then((instance) => {
            return instance.getBalance.call(accounts[0]);
        }).catch((err) => {
            console.log(err);
        }).then(function(balance) {
            callback(undefined, balance.valueOf());
        }).catch((err) => {
            console.log(err);
        });
    });    
}