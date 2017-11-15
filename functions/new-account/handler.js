"use strict"

const querystring = require('querystring');
const { promisify } = require('util');

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.eth_host}:8545`));

module.exports = (context, callback) => {
    const body = querystring.parse(context);
    if(!body.password) {
        callback(undefined, {error: 'invalid param #=> password'});
        return;
    }

    const password = body.password.trim();
    promisify(web3.eth.personal.newAccount.bind(web3.eth.personal))(password).then(result => {
        callback(undefined, {data: {address: result.toLowerCase()}});
    }).catch(err => {
        callback(undefined, err);
    });
}