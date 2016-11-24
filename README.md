# easy-slack-bot

Node.js based, modular Slack bot framework.

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Dependency Status][deps-image]][deps-url]
[![devDependency Status][devs-image]][devs-url]


## INSTALLATION
```
$ npm install easy-slack-bot --save
```


## EXAMPLE
See sample files in ["example"](https://github.com/sipimokus/easy-slack-bot/tree/master/example) direction.


## USAGE
Simple index.js:
```
process.env.SLACK_TOKEN = "slack-bot-token";

var SlackBot = require("easy-slack-bot"),
    BotItems = __dirname + "/items";

new SlackBot(BotItems);
```

Simple items/hello.js item:
```
module.exports = function( bot )
{
    // https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':robot_face:'
    };

    return 
    {
        // Get message
        // https://rawgit.com/sipimokus/easy-slack-bot/master/docs/interfaces/islackbotsmessage.html
        message: function( message, callBack ) 
        {
            // Detected word in message
            if ( message.natural.indexOf("hello") > -1 ) 
            {
                // Answer message
                callBack("Hello world!", params);

                return true;
            }

            return false;
        }
    };
};
```


## DOCUMENTATION
[Source documentation find here.](https://rawgit.com/sipimokus/easy-slack-bot/master/docs/index.html)

[npm-image]: https://img.shields.io/npm/v/easy-slack-bot.svg
[npm-url]: https://npmjs.org/package/easy-slack-bot
[travis-image]: https://img.shields.io/travis/sipimokus/easy-slack-bot/master.svg?label=linux
[travis-url]: https://travis-ci.org/sipimokus/easy-slack-bot
[appveyor-image]: https://img.shields.io/appveyor/ci/sipimokus/easy-slack-bot/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/sipimokus/easy-slack-bot
[deps-image]: https://img.shields.io/david/sipimokus/easy-slack-bot.svg?label=deps
[deps-url]: https://david-dm.org/sipimokus/easy-slack-bot
[devs-image]: https://img.shields.io/david/dev/sipimokus/easy-slack-bot.svg?label=devDeps
[devs-url]: https://david-dm.org/sipimokus/easy-slack-bot?type=dev
