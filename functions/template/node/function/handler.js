"use strict"

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.eth_host}:8545`));
const querystring = require('querystring');

module.exports = (context, callback) => {
    const body = querystring.parse(context);
    web3.eth.getAccounts((err, result) => {
        callback(undefined, result);
    });    
}
