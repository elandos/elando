# Elando

`Elando` is a blockchain based platform enhances the motivation of community activities and technologists participating in it. It also provides consistent values across multiple different communities.

## Install CLIs

- [faas-cli](https://github.com/openfaas/faas-cli) is a CLI for use with [OpenFaaS](https://github.com/openfaas/faas).

`$ curl -sSL https://cli.openfaas.com | sudo sh`

- [Truffle](http://truffleframework.com/) is the most popular development framework for Ethereum.

`$ npm install -g truffle`

- [testrpc](https://github.com/ethereumjs/testrpc) is a Node.js based Ethereum client for testing and development.

`$ npm install -g ethereumjs-testrpc`

## Debug

1. Run testrpc

```
$ testrpc
```

2. Deploy DApp

```
$ cd core
$ truffle compile
$ truffle migrate
$ truffle test
$ truffle console
```

3. Invoke Functions

```
$ cd functions
$ faas-cli build -f functions.yml
$ faas-cli deploy -f functions.yml
$ faas-cli invoke create_account
password=hogehoge1 #=> input
0xBfEFf66781fa2789bE8d6AaBF6b89F0BEc535E53 #=> output
```
