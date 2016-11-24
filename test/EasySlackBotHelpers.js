process.env.NODE_ENV = 'test';

var asserts = require('assert');
var fs = require("fs");
var path = require("path");

describe('EasySlackBot.Helpers', function () {
    var Helpers = require("../lib/index.js").Helpers;
    var subject;

    /**
     * Constructor
     */
    beforeEach(function () {
        subject = new Helpers();
    });

    describe('#changeAccentedChars()', function () {
        it('Testing lower cased accented chars', function () {
            var result = subject.changeAccentedChars("árvíztűrő tükörfúrógép");
            asserts.equal(result, "arvizturo tukorfurogep");
        });

        it('Testing upper cased accented chars', function () {
            var result = subject.changeAccentedChars("ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP");
            asserts.equal(result, "ARVIZTURO TUKORFUROGEP");
        });

        it('Testing mixed cased accented chars', function () {
            var result = subject.changeAccentedChars("ÁáÉéŰűÚúÜüÓóÍí");
            asserts.equal(result, "AaEeUuUuUuOoIi");
        });
    });

    describe('#intersectionOfArrays()', function () {
        it('Testing intersection of arrays', function () {
            var result = subject.intersectionOfArrays([1,2,3,4], [1,3,5]);
            asserts.deepEqual(result, [1,3]);
        });
    });

    describe('#naturalizeText()', function () {
        it('Testing naturalize text', function () {
            var result = subject.naturalizeText("Géza kék az ég!");
            asserts.deepEqual(result, ["geza", "kek", "az", "eg"]);
        });

        it('Testing naturalize multiple line text', function () {
            var result = subject.naturalizeText("Géza kék az ég!\nÁrvíztűrő tükörfúrógép?");
            asserts.deepEqual(result, ["geza", "kek", "az", "eg", "arvizturo", "tukorfurogep"]);
        });
    });
});