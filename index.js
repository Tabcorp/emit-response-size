const isRes = require('is-server-response')
const assert = require('assert')

module.exports = emitResponseSize

// Emit the response size as an event
// obj -> null
function emitResponseSize (res) {
  assert.ok(isRes(res), 'is res')

  const origiWrite = res.write.bind(res)
  const origiEnd = res.end.bind(res)

  var size = 0

  res.write = write.bind(res)
  res.end = end.bind(res)

  function write (data) {
    if (data) size += (data.length || 0)
    origiWrite(data)
  }

  function end (data) {
    if (data) size += (data.length || 0)
    res.emit('size', size)
    origiEnd(data)
  }
}
