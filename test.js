const getPort = require('get-server-port')
const http = require('http')
const test = require('tape')
const emitResSize = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(emitResSize, /is res/, 'is res')
})

test('should patch res.end to emit a size event', function (t) {
  t.plan(1)
  const server = http.createServer(function (req, res) {
    emitResSize(res)
    res.on('size', function (size) {
      t.equal(size, 5, 'size')
      server.close()
    })
    res.end('hello')
  }).listen()

  const port = getPort(server)
  http.get('http://localhost:' + port)
})

test('should patch res.write to emit a size event', function (t) {
  t.plan(1)
  const server = http.createServer(function (req, res) {
    emitResSize(res)
    res.on('size', function (size) {
      t.equal(size, 11, 'size')
      server.close()
    })
    res.write('hello')
    res.end('foobar')
  }).listen()

  const port = getPort(server)
  http.get('http://localhost:' + port)
})
