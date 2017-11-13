"use strict"

const querystring = require('querystring');

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.eth_host}:8545`));

module.exports = (context, callback) => {
    const body = querystring.parse(context);
    if(!body.address) {
        callback(undefined, {error: 'address is empty.'});
        return;
    }

    const address = body.address.trim();
    web3.eth.getBalance(address, (err, result) => {
        if(err != null) {
            callback(undefined, err);
        }else {
            const amount = result.valueOf();
            callback(undefined, {amount: amount, unit: 'wei'});
        }
    });
}