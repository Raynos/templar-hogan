var hoganize = require("../index"),
    routilHoganize = hoganize.routil
    sinon = require("sinon"),
    assert = require("assert")

describe("Templar-hogan", function () {
    describe("hoganize", function () {
        it("should call loadFolder", function () {
            var templar = createTemplar(),
                loadFolder = templar.loadFolder,
                uri = {}

            hoganize(templar, uri)

            assert(loadFolder.calledOnce, "loadFolder was not called")
            assert(loadFolder.calledWith(uri), 
                "loadFolder was not called correctly")
        })

        it("should return engine and folder", function () {
            var templar = createTemplar(),
                uri = {}

            var options = hoganize(templar, uri)

            assert.equal(options.folder, uri, "options.folder is wrong")
            assert(options.engine.compile, 
                "engine does not have a compile function")
        })
    })

    describe("routilHoganize", function () {
        it("should invoke Templar.loadFolder", function () {
            var routil = createRoutil(),
                loadFolder = routil.Templar.loadFolder,
                uri = {}

            routilHoganize(routil, uri)

            // WHY ARE YOU TRUE
            console.log(loadFolder.calledTwice)

            assert(loadFolder.calledOnce, "loadFolder was not called")
            assert(loadFolder.calledWith(uri), 
                "loadFolder was not called correctly")
        })
    })
})

function createRoutil() {
    var config = sinon.spy(),
        templar = createTemplar()

    return {
        config: config,
        Templar: templar
    }
}

function createTemplar() {
    var loadFolder = sinon.spy()
    
    return {
        loadFolder: loadFolder
    }
}