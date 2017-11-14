"use strict"

const querystring = require('querystring');

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.eth_host}:8545`));

module.exports = (context, callback) => {
    const body = querystring.parse(context);
    if(!body.password) {
        callback(undefined, {error: 'invalid param #=> password'});
        return;
    }

    const password = body.password.trim();
    web3.eth.personal.newAccount(password, (err, result) => {
        if(err != null) {
            callback(undefined, err);
        }else {
            callback(undefined, {address: result});
        }
    });
}