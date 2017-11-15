"use strict"

const querystring = require('querystring');
const { promisify } = require('util');

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.eth_host}:8545`));

module.exports = (context, callback) => {
    // const body = querystring.parse(context);
    const body = JSON.parse(context);
    if(!body.address) {
        callback(undefined, {error: 'invalid param #=> address'});
        return;
    }

    const address = body.address.trim();
    promisify(web3.eth.getBalance.bind(web3.eth))(address).then(balance => {
        const value = balance.valueOf();
        callback(undefined, {data: {value: value, unit: 'wei'}});
    }).catch(err => {
        callback(undefined, err);
    });
}