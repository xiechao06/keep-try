# try-until
try to do a chain of somethings until one success

## Installation

```bash
$ npm i keep-try
```

## Motivation

A functional way to get a fallback value

## Usage

```javascript
import keepTry from 'keep-try'

keep() // nothing happens
keepTry(1) // 1
keepTry(() => throw new Error('foo'), 1) // 1
keepTry(() => throw new Error('foo'), (err, errors) => err.message) // 'foo'

keepTry(() => throw new Error('foo'), () => throw new Error('bar'), 1) // 1

(async function () {
    await keepTry(Promise.reject(1), err => err) // 1
    await keepTry(Promise.reject(1), err => err) // 1
    await keepTry(Promise.reject(1), err => err) // 1
    await keepTry(async function () {
        throw new Error('foo')
    }, err => err.message) // 'foo' 
    await keepTry(async function () {
        throw new Error('foo')
    }, Promise.reject(1)) // unhandled promise
    await keepTry(async function () {
        throw new Error('foo')
    }, () => {
        throw new Error('bar')
    }) // throw exception
})
```

## API

### keepTry(...chain)

keep try each element in chain until one element:

    * does't throw exception, 
    * does't reject, if it is a Promise
    * does't return a promise rejects, if it is a function or async function

every element in chain could be a:

    * function
    * async function
    * promise
    * others

if any thing in chain is either an async function or promise or a function that 
returns promise, returns a Promise resolved with last `success value` or 
rejected with the `fail value`

if element is an async function or function, it accepts two arguments, the first
one is the error thrown by last element or value rejected by last element, the 
second one is an array of errors/values thrown/rejected by previous elements (including 
the last one)

## Development

```bash
$ git clone git@github.com:xiechao06/keep-try.git
$ cd keep-try
$ npm run dev 
```