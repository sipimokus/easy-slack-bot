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
    BotItems = __dirname + "/items";

new SlackBot(BotItems, function( bot )
{
    // Example "Hello World"
    //
    // Define channel, where bot exist.
    // You can adjust it there https://my.slack.com/services
    var channel = "general",
        message = "Hello Slack!",
        params = {
            icon_emoji: ":robot_face:"
        };

    bot.postMessageToChannel(channel, message, params, function(){
        console.log("Hello message sent");
    });
});
