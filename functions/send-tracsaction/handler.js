"use strict"

const querystring = require('querystring');

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.eth_host}:8545`));

module.exports = (context, callback) => {
    const body = querystring.parse(context);
    const from = body.from
    const to = body.to
    const amount = body.amount

    callback(undefined, {});
}