/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />

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
