export function keepTrySync (...elements) {
  let ret = void 0
  let prevException = null
  let prevExceptions = []
  for (let el of elements) {
    if (typeof el === 'function') {
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

export async function keepTry (...elements) {
  let ret = void 0
  let prevException = null
  let prevExceptions = []

  for (let el of elements) {
    try {
      ret = await (typeof el === 'function' ? el(prevException, prevExceptions) : el)
      prevException = null
      break
    } catch (error) {
      prevException = error
      prevExceptions.push(error)
    }
  }
  return ret
}
