# Elando Functions

## Setup OpenFaas

See #=> https://github.com/openfaas/faas/blob/master/guide/deployment_swarm.md

## Add new function

```
$ cd functions
$ faas-cli new FUNCTION_NAME --lang node
$ cd FUNCTION_NAME
$ npm install
```
## Build & Deply & Invoke

```
$ faas-cli build --filter FUNCTION_NAME -f functions.yml && faas-cli deploy --filter FUNCTION_NAME -f functions.yml
$ faas-cli invoke FUNCTION_NAME
```

## Functions

### newAccount(password)

```
$ faas-cli invoke new-account
in: password=XXXXXXXX
out: {"data": {"address": "XXXXXXXXXXXXXXXX"}}
```

### getBalance(address)

```
$ faas-cli invoke get-balance
in: address=XXXXXXXXXXXXXXXX
out: {"data": {"amount": 99999999, "unit": "wei"}}
```


### getTransactions(address)

```
$ faas-cli invoke get-transactions
in: address=XXXXXXXXXXXXXXXX
out: {"data": [{"hash":"...","nonce":0,"blockHash":"...","blockNumber":1,"transactionIndex":0,"from":"...","to":"...","value":"...","gas":90000,"gasPrice":"1","input":"0x0"}]}
```

### sendTransaction(from, to, value)

```
$ faas-cli invoke send-transaction
in: from=XXXXXXXXXXXXXXXX to=XXXXXXXXXXXXXXXX value=99999999
out: {"data": {"transaction": "XXXXXXXXXXXXXXXX"}}
```
