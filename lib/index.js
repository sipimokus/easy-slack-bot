/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />
/**
 * easy-slack-bot namespace.
 */
var EasySlackBot;
/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />
/**
 * easy-slack-bot namespace.
 */
(function (EasySlackBot) {
    /**
     * Filters class.
     */
    var Filters = (function () {
        /**
         *
         */
        function Filters() {
            this.debug = require("debug")("SlackBot.Filters");
            this.debug("__constructor");
        }
        return Filters;
    }());
    EasySlackBot.Filters = Filters;
})(EasySlackBot || (EasySlackBot = {}));
/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />
/**
 * easy-slack-bot namespace.
 */
var EasySlackBot;
/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />
/**
 * easy-slack-bot namespace.
 */
(function (EasySlackBot) {
    /**
     * Helpers class.
     */
    var Helpers = (function () {
        /**
         *
         */
        function Helpers() {
            this.debug = require("debug")("SlackBot.Helpers");
            this.natural = require("parse-latin")();
            this.latinize = require("latinize");
            this.debug("__constructor");
        }
        /**
         *
         * @param a
         * @param b
         * @returns {Array}
         */
        Helpers.prototype.intersectionOfArrays = function (a, b) {
            var c = [];
            var j = 0;
            for (var i = 0; i < a.length; ++i) {
                if (b.indexOf(a[i]) !== -1) {
                    c[j++] = a[i];
                }
            }
            return c;
        };
        /**
         *
         * @param source
         * @returns {string}
         */
        Helpers.prototype.changeAccentedChars = function (source) {
            return this.latinize(source);
        };
        /**
         * Naturalize message text
         *
         * @param text
         * @returns {string[]}
         */
        Helpers.prototype.naturalizeText = function (text) {
            var resultObject = this.natural.tokenize(this.changeAccentedChars(text.toLowerCase()));
            var result = [];
            for (var index in resultObject) {
                if (resultObject.hasOwnProperty(index)) {
                    var valueObject = resultObject[index];
                    if (valueObject.type === "WordNode") {
                        result.push(valueObject.children[0].value);
                    }
                }
            }
            return result;
        };
        return Helpers;
    }());
    EasySlackBot.Helpers = Helpers;
})(EasySlackBot || (EasySlackBot = {}));
/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />
var fs = require("fs");
/**
 * easy-slack-bot namespace.
 */
var EasySlackBot;
/**
 * easy-slack-bot namespace.
 */
(function (EasySlackBot) {
    /**
     * Items manager class.
     */
    var Items = (function () {
        /**
         * Items manager constructor.
         */
        function Items() {
            this.debug = require("debug")("SlackBot.Items");
            this.items = {};
            this.debug("__constructor");
        }
        /**
         * Set botItems object
         *
         * @param botItems
         */
        Items.prototype.setBotItems = function (botItems) {
            this.loadItems(botItems);
        };
        /**
         * Set slackbots object.
         *
         * @param botObject
         */
        Items.prototype.setBot = function (botObject) {
            this.bot = botObject;
        };
        /**
         * Get slackbots object.
         *
         * @returns {any}
         */
        Items.prototype.getBot = function () {
            return this.bot;
        };
        /**
         * Get items list.
         *
         * @returns {any}
         */
        Items.prototype.getList = function () {
            return this.items;
        };
        /**
         * Get item ibject by name.
         *
         * @param itemName
         * @returns {any}
         */
        Items.prototype.getItem = function (itemName) {
            return this.items[itemName];
        };
        /**
         *
         * Slack on message ewent.
         * Here calling item object "message" function.
         *
         * @param message
         * @param callBack
         */
        Items.prototype.onMessage = function (message, callBack) {
            this.debug("__onMessage");
            var runMessage = function (text, params, err) {
                callBack(text, params, err);
            };
            for (var index in this.items) {
                if (this.items.hasOwnProperty(index)) {
                    this.debug("__onMessage " + index);
                    if (typeof this.items[index].message !== "undefined") {
                        // TODO
                        if (this.items[index].message(message, runMessage)) {
                            this.debug("__onMessage_match: " + index);
                        }
                        else {
                            this.debug("__onMessage_none: " + index);
                        }
                    }
                }
            }
        };
        /**
         * Loading items mechanism.
         *
         * @param itemsObject
         * @returns {boolean}
         */
        Items.prototype.loadItems = function (itemsObject) {
            if (typeof itemsObject === "string") {
                return this.loadItemsPath(itemsObject);
            }
            else {
                return this.loadItemsList(itemsObject);
            }
        };
        /**
         * Loading items from filesystem.
         *
         * @param itemsList
         * @returns {boolean}
         */
        Items.prototype.loadItemsList = function (itemsList) {
            if (!itemsList) {
                return false;
            }
            for (var index in itemsList) {
                if (itemsList.hasOwnProperty(index)) {
                    var itemSource = itemsList[index];
                    if (typeof itemsList[index] === "function") {
                        this.items[index] = new itemSource(this.getBot());
                    }
                }
            }
            return true;
        };
        /**
         * Loading items from manual declared list.
         *
         * @param itemsPath
         * @returns {boolean}
         */
        Items.prototype.loadItemsPath = function (itemsPath) {
            var itemsFiles = fs.readdirSync(itemsPath);
            if (!itemsFiles) {
                return false;
            }
            for (var index in itemsFiles) {
                if (itemsFiles.hasOwnProperty(index)) {
                    var itemSource = require(itemsPath + "/" + itemsFiles[index]);
                    if (typeof itemSource === "function") {
                        this.items[itemsFiles[index].split(".")[0]] = new itemSource(this.getBot());
                    }
                }
            }
            return true;
        };
        return Items;
    }());
    EasySlackBot.Items = Items;
})(EasySlackBot || (EasySlackBot = {}));
/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />
/// <reference path="./Helpers.ts" />
/**
 *
 */
var EasySlackBot;
/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />
/// <reference path="./Helpers.ts" />
/**
 *
 */
(function (EasySlackBot) {
    /**
     *
     */
    var Message = (function () {
        /**
         *
         */
        function Message() {
            this.debug = require("debug")("SlackBot.Message");
            this.debug("__constructor");
            this.Helpers = new EasySlackBot.Helpers();
        }
        Message.prototype.onMessage = function (message, callBack) {
            if (message.text) {
                message.natural = this.Helpers.naturalizeText(message.text);
            }
            else {
                message.natural = [];
            }
            callBack(message);
        };
        return Message;
    }());
    EasySlackBot.Message = Message;
})(EasySlackBot || (EasySlackBot = {}));
/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />
/**
 * easy-slack-bot namespace.
 */
var EasySlackBot;
/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />
/**
 * easy-slack-bot namespace.
 */
(function (EasySlackBot) {
    /**
     * Slack manager class.
     */
    var Slack = (function () {
        /**
         * Slack manager constructor.
         */
        function Slack() {
            this.debug = require("debug")("SlackBot.Slack");
            this.client = require("slackbots");
            this.debug("__constructor");
            this.token = process.env.SLACK_TOKEN;
        }
        /**
         * Connect and start Slack module.
         *
         * @param callBack
         */
        Slack.prototype.start = function (callBack) {
            var _this = this;
            // Create a bot
            this.bot = new this.client({
                token: this.token,
                name: "master",
            });
            this.bot.on("start", function () {
                _this.debug("start");
                callBack(_this.bot);
            });
        };
        return Slack;
    }());
    EasySlackBot.Slack = Slack;
})(EasySlackBot || (EasySlackBot = {}));
/// <reference path="../typings/index.d.ts" />
/// <reference path="./vendor.d.ts" />
/// <reference path="./core/Helpers.ts" />
/// <reference path="./core/Items.ts" />
/// <reference path="./core/Message.ts" />
/// <reference path="./core/Slack.ts" />
var EasySlackBot;
/// <reference path="../typings/index.d.ts" />
/// <reference path="./vendor.d.ts" />
/// <reference path="./core/Helpers.ts" />
/// <reference path="./core/Items.ts" />
/// <reference path="./core/Message.ts" />
/// <reference path="./core/Slack.ts" />
(function (EasySlackBot) {
    var Main = (function () {
        function Main(botItems, callBack) {
            this.debug = require("debug")("SlackBot.Main");
            this.debug("__constructor");
            this.Helpers = new EasySlackBot.Helpers();
            this.Items = new EasySlackBot.Items();
            this.Message = new EasySlackBot.Message();
            this.Slack = new EasySlackBot.Slack();
            this.start(botItems, !callBack ? function () {
                // Fake callback
            } : callBack);
        }
        Main.prototype.start = function (botItems, callBack) {
            var _this = this;
            this.Items.setBotItems(botItems);
            this.Slack.start(function (bot) {
                _this.bot = bot;
                _this.Items.setBot(_this.bot);
                _this.onSlackMessage(callBack);
            });
        };
        /**
         * Handling Slack messages
         *
         * @param callBack
         */
        Main.prototype.onSlackMessage = function (callBack) {
            var _this = this;
            this.debug("Connected");
            this.bot.on("message", function (slackMessage) {
                _this.Message.onMessage(slackMessage, function (message) {
                    if (message.type === "message" && message.subtype !== "bot_message") {
                        _this.Items.onMessage(message, function (text, params, err) {
                            _this.bot.postMessage(message.channel, text, params);
                        });
                    }
                });
            });
            callBack(this.bot);
        };
        return Main;
    }());
    EasySlackBot.Main = Main;
})(EasySlackBot || (EasySlackBot = {}));
module.exports = EasySlackBot;
//# sourceMappingURL=index.js.map