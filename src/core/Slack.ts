/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />

/**
 * easy-slack-bot namespace.
 */
namespace EasySlackBot
{
    /**
     * Slack manager class.
     */
    export class Slack
    {
        private debug: debug.IDebug = require("debug")("SlackBot.Slack");
        private client: any = require("slackbots");
        private token: string;
        private bot: ISlackbots;

        /**
         * Slack manager constructor.
         */
        public constructor()
        {
            this.debug("__constructor");

            this.token = process.env.SLACK_TOKEN;
        }

        /**
         * Connect and start Slack module.
         *
         * @param callBack
         */
        public start( callBack: ImainOnSlackMessageCallBack ): void
        {
            // Create a bot
            this.bot = new this.client({
                token: this.token,
                name : "master",
            });

            this.bot.on("start", () =>
            {
                this.debug("start");
                callBack(this.bot);
            });
        }
    }
}
