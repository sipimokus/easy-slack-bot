/**
 * EasySlackBot example file
 *
 * @example BotItems = "./items-path";
 * @example BotItems = {
 *            bullshit : require("./items-path/bullshit"),
 *          };
 */

require("dotenv").config();

var SlackBot = require("easy-slack-bot"),
    BotItems = __dirname + "/items",
    BotOptions = {
        Slack: {
            SLACK_TOKEN: process.env.SLACK_TOKEN
        }
    };

new SlackBot(BotItems, BotOptions, function (bot) {
    // Example "Hello World"
    //
    // Define channel, where bot exist.
    // You can adjust it there https://my.slack.com/services
    var channel = "general",
        message = "Hello Slack!",
        params = {
            icon_emoji: ":robot_face:"
        };

    bot.postMessageToChannel(channel, message, params, function () {
        console.log("Hello message sent");
    });
});
