var pg = require('pg.js')
pg.defaults.poolSize = 1
var query = require('pg-query')
var writable = require('../')
var assert = require('assert')

describe('writable', function() {
  var tableName = 'my_test_table'
  before(function(done) {
    query('DROP TABLE IF EXISTS ' + tableName)
    var qText = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (name text not null, age int, created_at timestamptz default now())'
    query(qText, done)
  })

  after(function() {
    pg.end()
  })

  it('creates the table', function(done) {
    query('SELECT * FROM ' + tableName, done)
  })

  it('streams data', function(done) {
    var stream = writable(tableName)
    stream.write(['brian', 32, new Date().toISOString()])
    stream.write(['aaron', 30, new Date().toISOString()])
    stream.end()
    stream.on('finish', done)
  })

  it('writes data to table', function(done) {
    query.first('SELECT COUNT(*) FROM ' + tableName, function(err, res) {
      if(err) return done(err);
      assert.equal(res.count, 2)
      done()
    })
  })
})
