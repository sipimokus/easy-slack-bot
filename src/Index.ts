/// <reference path="../typings/index.d.ts" />
/// <reference path="./vendor.d.ts" />
/// <reference path="./core/Helpers.ts" />
/// <reference path="./core/Items.ts" />
/// <reference path="./core/Message.ts" />
/// <reference path="./core/Slack.ts" />

namespace EasySlackBot
{
    export class Main
    {
        private debug: debug.IDebug = require("debug")("SlackBot.Main");
        private Helpers: EasySlackBot.Helpers;
        private Items: EasySlackBot.Items;
        private Message: EasySlackBot.Message;
        private Slack: EasySlackBot.Slack;
        private bot: ISlackbots;

        constructor( botItems: any, callBack?: any )
        {
            this.debug("__constructor");

            this.Helpers = new EasySlackBot.Helpers();
            this.Items = new EasySlackBot.Items();
            this.Message = new EasySlackBot.Message();
            this.Slack = new EasySlackBot.Slack();


            this.start(botItems, !callBack ? () => {
                // Fake callback
            } : callBack);
        }

        private start( botItems: any, callBack: ImainOnSlackMessageCallBack ) : void
        {
            this.Items.setBotItems(botItems);
            this.Slack.start(( bot: ISlackbots ) =>
            {
                this.bot = bot;
                this.Items.setBot(this.bot);

                this.onSlackMessage(callBack);
            });
        }

        /**
         * Handling Slack messages
         *
         * @param callBack
         */
        private onSlackMessage( callBack: ImainOnSlackMessageCallBack ): void
        {
            this.debug("Connected");

            this.bot.on("message", ( slackMessage: ISlackbotsMessage ) =>
            {
                this.Message.onMessage(slackMessage, ( message: ISlackbotsMessage ) =>
                {
                    if ( message.type === "message" && message.subtype !== "bot_message" )
                    {
                        this.Items.onMessage(message, ( text: string, params: any, err: any ) =>
                        {
                            this.bot.postMessage(message.channel, text, params);
                        });
                    }
                });
            });

            callBack(this.bot);
        }
    }
}

module.exports = EasySlackBot;
