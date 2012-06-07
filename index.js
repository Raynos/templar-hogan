var hogan = require("hogan.js"),
    engine = {
        compile: function (contents, options) {
            var compiled = hogan.compile(contents, options)

            return renderer

            function renderer(data) {
                return compiled.render(data)
            }
        }
    }

module.exports = hoganize
hoganize.routil = routilHoganize

function hoganize(templar, uri) {
    templar.loadFolder(uri)

    return {
        engine: engine,
        folder: uri
    }
}

function routilHoganize(routil, uri) {
    routil.config({
        templar: hoganize(routil.Templar, uri)
    })

    routil.Templar.loadFolder(uri)
}