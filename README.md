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
import keepTry, { sync as keepTrySync } from 'keep-try'

keepTrySync() // nothing happens
keepTrySync(1) // 1
keepTrySync(() => throw new Error('foo'), 1) // 1
keepTrySync(() => throw new Error('foo'), (err, errors) => err.message) // 'foo'

keepTrySync(() => throw new Error('foo'), () => throw new Error('bar'), 1) // 1

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

Keep try each element in chain until one element:

    * does't throw exception,
    * does't reject, if it is a Promise
    * does't return a promise rejects, if it is a function or async function

Every element in chain could be a:

    * function
    * async function
    * promise
    * others

It returns a Promise resolved with last `success value` or
rejected with the `fail value`

if element is an async function or function, it accepts two arguments, the first
one is the error thrown by last element or value rejected by last element, the
second one is an array of errors/values thrown/rejected by previous elements (including
the last one)

### keepTrySync(...chain)

## Development

Keep trying each element in chain until one element doesn't throw exception.

Every element in chain could be a:

  * function
  * others

It returns the last `success value` or throw out the last exception if all elements
in chain throw exceptions

if element is a function, it accepts two arguments, the first
one is the error thrown by last function, the
second one is an array of errors/values thrown by previous elements (including
the last one)

```bash
$ git clone git@github.com:xiechao06/keep-try.git
$ cd keep-try
$ npm run dev
```
