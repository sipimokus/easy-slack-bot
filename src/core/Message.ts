/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />
/// <reference path="./Helpers.ts" />

/**
 *
 */
namespace EasySlackBot
{
    /**
     *
     */
    export class Message
    {
        private debug: debug.IDebug = require("debug")("SlackBot.Message");
        private Helpers: EasySlackBot.Helpers;

        /**
         *
         */
        public constructor()
        {
            this.debug("__constructor");

            this.Helpers = new EasySlackBot.Helpers();
        }

        public onMessage( message: ISlackbotsMessage, callBack: ImessageOnSlackMessageCallBack ): void
        {
            if ( message.text )
            {
                message.natural = this.Helpers.naturalizeText( message.text );
            }
            else
            {
                message.natural = [];
            }

            callBack(message);
        }
    }
}
