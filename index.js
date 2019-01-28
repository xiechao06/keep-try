import is from '@sindresorhus/is'

function keepTrySync (...elements) {
  let ret = void 0
  let prevException = null
  let prevExceptions = []
  for (let el of elements) {
    if (is.function(el)) {
      try {
        ret = el(prevException, prevExceptions)
        prevException = null
        break
      } catch (error) {
        prevException = error
        prevExceptions.push(error)
      }
    } else {
      ret = el
      prevException = null
      break
    }
  }
  if (prevException) {
    throw prevException
  }
  return ret
}

export const sync = keepTrySync

async function keepTry (...elements) {
  let ret = void 0
  let prevException = null
  let prevExceptions = []

  for (let el of elements) {
    try {
      ret = await (is.function(el) ? el(prevException, prevExceptions) : el)
      prevException = null
      break
    } catch (error) {
      prevException = error
      prevExceptions.push(error)
    }
  }
  return ret
}

export default keepTry
