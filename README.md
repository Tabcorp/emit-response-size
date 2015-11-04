# emit-response-size [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Emit the response size as an event. Monkey patches an instance of
`Class:http.ServerResponse` to emit a `size` event before end.

If you're using streams and want the size of a response, consider using
[size-stream](https://github.com/yoshuawuyts/size-stream) instead.

## Installation
```sh
$ npm install emit-response-size
```

## Usage
```js
const resSize = require('emit-response-size')
const httpNdjson = require('http-ndjson')
const stdout = require('stdout-stream')
const http = require('http')
const pump = require('pump')

http.createServer(function (req, res) {
  resSize(res)

  const httpLogger = httpNdjson(req, res)
  pump(httpLogger, stdout)

  res.on('size', function (size) {
    httpLogger.setSize(size)
    res.setHeader('Content-Length', size)
  })

  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world')
})
```

## API
### emitResponseSize(res)
Patch a `res` object to emit a `'size'` event before ending.

### res.on('size', cb(size))
Listen to a `'size'` event on a response. Emitted before the `'close'` event.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/emit-response-size.svg?style=flat-square
[3]: https://npmjs.org/package/emit-response-size
[4]: https://img.shields.io/travis/TabDigital/emit-response-size/master.svg?style=flat-square
[5]: https://travis-ci.org/TabDigital/emit-response-size
[6]: https://img.shields.io/codecov/c/github/TabDigital/emit-response-size/master.svg?style=flat-square
[7]: https://codecov.io/github/TabDigital/emit-response-size
[8]: http://img.shields.io/npm/dm/emit-response-size.svg?style=flat-square
[9]: https://npmjs.org/package/emit-response-size
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
