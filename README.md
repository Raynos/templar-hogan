# Templar-hogan [![build status][1]][2]

Hogan.js support for templar and routil

## Example

    // with templar
    var hoganize = require("templar-hogan"),
        Templar = require("templar"),
        path = require("path"),
        templarOptions = hoganize(templar, path.join(__dirname, "..", "template"))

    http.createServer(function (req, res) {
        res.template = Templar(req, res, templarOptions)

        // .. later, after figuring out which template to use ..
        res.template('foo.mustache', { 
            some: 'data', 
            for: [ 'the', 'template'] 
        })
    }).listen(PORT)

    // with routil
    var routil = require("routil"),
        hoganize = require("templar-hogan").routil,
        path = require("path")

    hoganize(routil, path.join(__dirname, "..", "templates")

    http.createServer(function (req, res) {
        // .. later, after figuring out which template to use ..
        routil.template(req, res, 'foo.mustache', { 
            some: 'data', 
            for: [ 'the', 'template'] 
        })
    }).listen(PORT)

## Installation

`npm install templar-hogan`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/templar-hogan.png
  [2]: http://travis-ci.org/Raynos/templar-hogan