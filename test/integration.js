var hoganize = require("../index"),
    routilHoganize = hoganize.routil,
    assert = require("assert"),
    http = require("http"),
    Templar = require("templar"),
    routil = require("routil"),
    request = require("request"),
    path = require("path")

describe("Templar-hogan server", function () {
    var err, res, body, server

    var codePaths = {
        "/templar": function (req, res) {
            var templarOptions = hoganize(Templar, 
                path.join(__dirname, "templates"))

            var template = Templar(req, res, templarOptions)

            template('test.mustache', {
                data: 'world'
            })
        },
        "/routil": function (req, res) {
            routilHoganize(routil, path.join(__dirname, "templates"))

            routil.template(req, res, "test.mustache", {
                data: "world"
            })
        }
    }

    before(function (done) {
        server = http.createServer(function (req, res) {
            codePaths[req.url](req, res)
        })
        server.listen(8080, done)
    })

    after(function (done) {
        server.on("close", done)
        server.close()
    })

    describe("calling /templar", function  () {
        before(function (done) {
            makeRequest("/templar", done)
        })

        it("should not have an error", noError)

        it("should have a statusCode of 200", statusCode200)

        it("should return text/html as contentType", textHtmlContentType)

        it("should return templated text", helloWorldBody)
    })

    describe("calling /routil", function () {
        before(function (done) {
            makeRequest("/routil", done)
        })

        it("should not have an error", noError)

        it("should have a statusCode of 200", statusCode200)

        it("should return text/html as contentType", textHtmlContentType)

        it("should return templated text", helloWorldBody)
    })

    function noError() {
        assert.equal(err, null, "error is not null")
    }

    function statusCode200() {
        assert.equal(res.statusCode, 200, "status code is not 200")
    }

    function textHtmlContentType() {
        assert.equal(res.headers["content-type"], "text/html",
            "content type is not html")
    }

    function helloWorldBody() {
        assert.equal(body, "hello world", "body is not hello world")
    }

    function makeRequest(uri, callback) {
        request({
            uri: "http://localhost:8080" + uri
        }, function (_err, _res, _body) {
            err = _err
            res = _res
            body = _body
            callback()
        })
    }
})