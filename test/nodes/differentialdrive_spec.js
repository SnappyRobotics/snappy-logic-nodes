var should = require("should");
var helper = require('../helper.js');
var differential_drive = require("../../differential_drive/differential_drive.js");
//var awsNode = require("../../aws/aws.js");
//var sinon = require('sinon');
var nock = helper.nock;

describe('testing differential drive', function() {

    before(function(done) {
        helper.startServer(done);
    });

    afterEach(function() {
        if (nock) {
            nock.cleanAll();
        }
        helper.unload();
    });

    it('should be loaded', function(done) {
        var flow = [{
            id: "n1",
            type: "differential drive",
            name: "function"
        }];
        helper.load(differential_drive, flow, function() {
            var n1 = helper.getNode("n1");
            done();
        });
    });


    it('differential_drive with input left expected output is 1,1', function(done) {
        var flow = [{
                id: "n1",
                type: "differential drive",
                wires: [
                    ["n2"],
                    ["n3"]
                ]
            },
            {
                id: "n2",
                type: "helper"
            },
            {
                id: "n3",
                type: "helper"
            }
        ];
        helper.load(differential_drive, flow, function() {
            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");
            var n3 = helper.getNode("n3");
            var c = 0;
            n2.on("input", function(msg) {
                try {
                    msg.should.have.property('payload', 1);
                    c++;
                    if (c == 2) {
                        done();
                    }
                } catch (err) {
                    done(err)
                }
            });
            n3.on("input", function(msg) {
                try {
                    msg.should.have.property('payload', 1);
                    c++;
                    if (c == 2) {
                        done();
                    }
                } catch (err) {
                    done(err)
                }
            });
            n1.receive({
                payload: "left",
                topic: "turn"
            });
            //done("Didn't gave expected output")
        });
    });

    it('Differential drive with input right expected output is -1,-1 ', function(done) {
        var flow = [{
                id: "n1",
                type: "differential drive",
                wires: [
                    ["n2"],
                    ["n3"]
                ]
            },
            {
                id: "n2",
                type: "helper"
            },
            {
                id: "n3",
                type: "helper"
            }
        ];
        helper.load(differential_drive, flow, function() {
            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");
            var n3 = helper.getNode("n3");
            var c = 0;
            n2.on("input", function(msg) {
                try {
                    msg.should.have.property('payload', -1);
                    c++;
                    if (c == 2) {
                        done();
                    }
                } catch (err) {
                    done(err)
                }
            });
            n3.on("input", function(msg) {
                try {
                    msg.should.have.property('payload', -1);
                    c++;
                    if (c == 2) {
                        done();
                    }
                } catch (err) {
                    done(err)
                }
            });
            n1.receive({
                payload: "right",
                topic: "turn"
            });
            //done("Didn't gave expected output")
        });
    });
    it('Differential drive with input forward expected output is -1,1 ', function(done) {
        var flow = [{
                id: "n1",
                type: "differential drive",
                wires: [
                    ["n2"],
                    ["n3"]
                ]
            },
            {
                id: "n2",
                type: "helper"
            },
            {
                id: "n3",
                type: "helper"
            }
        ];
        helper.load(differential_drive, flow, function() {
            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");
            var n3 = helper.getNode("n3");
            var c = 0;
            n2.on("input", function(msg) {
                try {
                    msg.should.have.property('payload', -1);
                    c++;
                    if (c == 2) {
                        done();
                    }
                } catch (err) {
                    done(err)
                }
            });
            n3.on("input", function(msg) {
                try {
                    msg.should.have.property('payload', 1);
                    c++;
                    if (c == 2) {
                        done();
                    }
                } catch (err) {
                    done(err)
                }
            });
            n1.receive({
                payload: "forward",
                topic: "motion"
            });
            //done("Didn't gave expected output")
        });

    });
    it('Differential drive with input reverse,Expected output is 1,-1 ', function(done) {
        var flow = [{
                id: "n1",
                type: "differential drive",
                wires: [
                    ["n2"],
                    ["n3"]
                ]
            },
            {
                id: "n2",
                type: "helper"
            },
            {
                id: "n3",
                type: "helper"
            }
        ];
        helper.load(differential_drive, flow, function() {
            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");
            var n3 = helper.getNode("n3");
            var c = 0;
            n2.on("input", function(msg) {
                try {
                    msg.should.have.property('payload', 1);
                    c++;
                    if (c == 2) {
                        done();
                    }
                } catch (err) {
                    done(err)
                }
            });
            n3.on("input", function(msg) {
                try {
                    msg.should.have.property('payload', -1);
                    c++;
                    if (c == 2) {
                        done();
                    }
                } catch (err) {
                    done(err)
                }
            });
            n1.receive({
                payload: "reverse",
                topic: "motion"
            });
            //done("Didn't gave expected output")
        });

    });

});
