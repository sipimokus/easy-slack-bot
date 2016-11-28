/// <reference path="./../source.d.ts" />

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
        public constructor( botOptions: IMainOptions )
        {
            this.debug("__constructor");

            if ( !botOptions.hasOwnProperty("Slack") )
            {
                throw new Error("Slack options undefined!");
            }

            if ( !botOptions.hasOwnProperty("Slack") )
            {
                throw new Error("Slack options SLACK_TOKEN undefined!");
            }

            this.token = botOptions.Slack.SLACK_TOKEN;
        }

        /**
         * Connect and start Slack module.
         *
         * @param callBack
         */
        public start( callBack: EasySlackBot.IMainOnSlackMessageCallBack ): void
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
