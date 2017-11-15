# Elando Dapp

## Debug

1. Run testrpc container

```
$ docker service create --name testrpc --network func_functions --publish 8545:8545 harshjv/testrpc
```

2. Connect to testrpc from local

```
$ truffle console
```

3. Check worke fine!

```
> web3.eth.accounts
```

4. Create some transactions

```
> web3.eth.sendTransaction({from: web3.eth.accounts[0], to: web3.eth.accounts[1], value: web3.toWei(5, "ether")})
> web3.eth.sendTransaction({from: web3.eth.accounts[1], to: web3.eth.accounts[2], value: web3.toWei(5, "ether")})
> web3.eth.sendTransaction({from: web3.eth.accounts[2], to: web3.eth.accounts[3], value: web3.toWei(5, "ether")})
> web3.eth.sendTransaction({from: web3.eth.accounts[3], to: web3.eth.accounts[4], value: web3.toWei(5, "ether")})
> web3.eth.sendTransaction({from: web3.eth.accounts[4], to: web3.eth.accounts[5], value: web3.toWei(5, "ether")})
```
