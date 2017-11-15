"use strict"

const querystring = require('querystring');
const { promisify } = require('util');

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.eth_host}:8545`));

module.exports = (context, callback) => {
    const body = querystring.parse(context);
    if(!body.from) {
        callback(undefined, {error: 'invalid param #=> from'});
        return;
    }
    if(!body.to) {
        callback(undefined, {error: 'invalid param #=> to'});
        return;
    }
    if(!body.value) {
        callback(undefined, {error: 'invalid param #=> value'});
        return;
    }

    const from = body.from.trim();
    const to = body.to.trim();
    const value = body.value.trim();
    const txObj = {from: from, to: to, value: value};
    promisify(web3.eth.sendTransaction.bind(web3.eth))(txObj).then(txHash => {
        return promisify(web3.eth.getTransaction.bind(web3.eth))(txHash);
    }).then(tx => {
        callback(undefined, {data: tx});
    }).catch(err => {
        callback(undefined, err);
    })
}