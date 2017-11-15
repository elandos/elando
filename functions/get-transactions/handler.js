"use strict"

const querystring = require('querystring');
const { promisify } = require('util');

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.eth_host}:8545`));

module.exports = (context, callback) => {
    const body = querystring.parse(context);
    if(!body.address) {
        callback(undefined, {error: 'invalid param #=> address'});
        return;
    }

    const address = body.address.trim();
    promisify(web3.eth.getBlockNumber.bind(web3.eth))().then(endBlockNumber => {
        let startBlockNumber = 0;
        let blockPromises = [];
        for(var i = startBlockNumber; i <= endBlockNumber; i++) {
            blockPromises.push(promisify(web3.eth.getBlock.bind(web3.eth))(i));
        }
        return Promise.all(blockPromises);
    }).then(blocks => {
        const transactions = blocks
            .map((block) => { return block.transactions; })
            .reduce((t1, t2) => { return t1.concat(t2); })
            .map((hash) => { return promisify(web3.eth.getTransaction.bind(web3.eth))(hash); });
        return Promise.all(transactions);
    }).then(txs => {
        let filtered = txs.filter((t) => {
            return (address == "*" || t.from.toLowerCase() == address || t.to.toLowerCase() == address);
        });
        callback(undefined, { transactions: filtered });
    }).catch(err => {
        console.log(err);
    });
}