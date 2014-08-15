# pg-writable

Very quickly write an __array__ of raw values into a postgres table.  pg-writable uses PostgreSQL copy-from mode to write binary data to a table very efficiently.  It's very brittle, but much, much faster than doing insert statements.

## install

```sh
$ npm i pg-writable
```

## use

```js
//assume we have a table named 'my_table' with
//a schema of CREATE TABLE my_table(name text, age int)

var writable = require('pg-writable')('my_table')

for(var i = 0; i < 100; i++) {
  writable.write(['name' + i, i])
}
writable.end()

```

## notes

Your array must match _exactly_ the schema of the table. Copy From mode uses a transaction implicitly so if your stream fails for any reason (missing data, disconnection, table constraint violations) the entire import will be rolled back...so that's nice.

## license

The MIT License (MIT)

Copyright (c) 2014 Brian M. Carlson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
