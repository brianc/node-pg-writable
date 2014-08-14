var mapper = require('through2').obj
var pg = require('pg.js')
var copyFrom = require('pg-copy-streams').from

var writable = module.exports = function(table) {
  var client = new pg.Client()
  client.connect()
  var stream = client.query(copyFrom('COPY ' + table + ' FROM STDIN'))

  var map = mapper(function(arr, enc, cb) {
    var rowText = arr.join('\t') + '\n'
    cb(null, rowText)
  })

  map.pipe(stream)

  stream.on('finish', function() {
    client.query('SELECT NOW()', function() {
      map.emit('finish')
      client.end()
    })
  })

  return map
}
