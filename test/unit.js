var hoganize = require("../index"),
    routilHoganize = hoganize.routil
    sinon = require("sinon"),
    assert = require("assert")

describe("Templar-hogan", function () {
    var routil, templar, options,
        uri = {}

    describe("calling hoganize", function () {
        before(function () {
            setup()

            options = hoganize(templar, uri)
        })

        it("should call loadFolder", loadFolderOnce)

        it("should return engine and folder", function () {
            assert.equal(options.folder, uri, "options.folder is wrong")
            assert.equal(typeof options.engine.compile, "function",
                "engine does not have a compile function")
        })
    })

    describe("calling routilHoganize", function () {
        before(function () {
            setup()

            routilHoganize(routil, uri)
        })

        it("should invoke Templar.loadFolder", loadFolderOnce)

        it("should invoke routil.config", function () {
            assert.ok(routil.config.calledOnce, "routil.config was not called")
            assert.ok(routil.config.calledWith({
                templar: {
                    folder: uri,
                    engine: {
                        compile: sinon.match.func
                    }
                }
            }), "routil.config was not called correctly")
        })
    })

    function loadFolderOnce() {
        assert.ok(templar.loadFolder.calledOnce, "loadFolder was not called")
        assert.ok(templar.loadFolder.calledWith(uri), 
            "loadFolder was not called correctly")
    }

    function setup() {
        templar = createTemplar()
        routil = createRoutil(templar)
    }
})

function createRoutil(templar) {
    var config = sinon.spy()

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