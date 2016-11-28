/// <reference path="./../source.d.ts" />

/**
 * easy-slack-bot namespace.
 */
namespace EasySlackBot
{
    /**
     * Filters class.
     */
    export class Filters
    {
        private debug: debug.IDebug = require("debug")("SlackBot.Filters");

        /**
         *
         */
        public constructor()
        {
            this.debug("__constructor");
        }
    }
}
