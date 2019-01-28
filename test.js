import test from 'tape'
import keepTry, { sync as keepTrySync } from './index'
import td from 'testdouble'

test('sync', async t => {
  t.equal(keepTrySync(), void 0)
  t.equal(keepTrySync(1), 1)
  t.equal(keepTrySync(() => 1), 1)

  t.equal(keepTrySync(() => {
    throw new Error()
  }, () => 1), 1)

  t.equal(keepTrySync(
    () => {
      throw new Error()
    },
    () => {
      throw new Error()
    },
    () => 2,
    1), 2)

  t.throws(() => keepTrySync(() => { throw new Error('foo') }), /foo/)
  t.throws(
    () => keepTrySync(
      () => { throw new Error('foo') },
      () => { throw new Error('bar') }
    ),
    /bar/)

  let return1 = td.func('return1')
  keepTrySync(return1)
  t.deepEqual(td.explain(return1).calls[0].args, [null, []])

  return1 = td.func('return1')
  const error = new Error('foo')
  keepTrySync(() => { throw error }, return1)
  t.deepEqual(td.explain(return1).calls[0].args, [error, [error]])

  t.end()
})

test('async', async t => {
  t.equal(await keepTry(), void 0)
  t.equal(await keepTry(1), 1)
  let return1 = td.func('return1')
  td.when(return1(null, [])).thenReturn(1)
  t.equal(await keepTry(return1), 1)
  t.equal(await keepTry(Promise.resolve(1)), 1)
  t.equal(await keepTry(() => Promise.resolve(1)), 1)
  t.equal(await keepTry(async () => Promise.resolve(1)), 1)

  t.equal(await keepTry(Promise.reject(new Error('foo')), 1, 2), 1)
  t.equal(await keepTry(() => Promise.reject(new Error('foo')), 1, 2), 1)
  t.equal(await keepTry(() => {
    throw new Error('foo')
  }, 1, 2), 1)
  t.equal(await keepTry(async () => {
    throw new Error('foo')
  }, 1, 2), 1)

  let error = new Error('foo')
  return1 = td.func('return1')
  keepTrySync(() => { throw error }, return1)
  t.deepEqual(td.explain(return1).calls[0].args, [error, [error]])

  t.end()
})
