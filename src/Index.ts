/// <reference path="./source.d.ts" />

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

        constructor( botItems: any, botOptions: IMainOptions, callBack?: any )
        {
            this.debug("__constructor");

            this.Helpers = new EasySlackBot.Helpers();
            this.Items = new EasySlackBot.Items();
            this.Message = new EasySlackBot.Message();
            this.Slack = new EasySlackBot.Slack(botOptions);


            this.start(botItems, botOptions, !callBack ? () =>
            {
                // Fake callback
            } : callBack);
        }

        private start( botItems: any, options: EasySlackBot.IMainOptions | EasySlackBot.IMainOnSlackMessageCallBack,
                       callBack?: EasySlackBot.IMainOnSlackMessageCallBack ): void
        {
            if ( typeof options === "function" )
            {
                callBack = <EasySlackBot.IMainOnSlackMessageCallBack>options;
            }

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
        private onSlackMessage( callBack: EasySlackBot.IMainOnSlackMessageCallBack ): void
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
