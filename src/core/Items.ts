/// <reference path="../../typings/index.d.ts" />
/// <reference path="./../vendor.d.ts" />

let fs: any = require("fs");

/**
 * easy-slack-bot namespace.
 */
namespace EasySlackBot
{
    /**
     * Items manager class.
     */
    export class Items
    {
        private debug: debug.IDebug = require("debug")("SlackBot.Items");
        private items: any = {};
        private bot: ISlackbots;

        /**
         * Items manager constructor.
         */
        public constructor()
        {
            this.debug("__constructor");
        }

        /**
         * Set botItems object
         *
         * @param botItems
         */
        public setBotItems( botItems: string | any ): void
        {
            this.loadItems(botItems);
        }

        /**
         * Set slackbots object.
         *
         * @param botObject
         */
        public setBot( botObject: ISlackbots ): void
        {
            this.bot = botObject;
        }

        /**
         * Get slackbots object.
         *
         * @returns {any}
         */
        public getBot(): ISlackbots
        {
            return this.bot;
        }

        /**
         * Get items list.
         *
         * @returns {any}
         */
        public getList(): IEasySlackBotItemObject[]
        {
            return this.items;
        }

        /**
         * Get item ibject by name.
         *
         * @param itemName
         * @returns {any}
         */
        public getItem( itemName: string ): IEasySlackBotItemObject
        {
            return this.items[ itemName ];
        }

        /**
         *
         * Slack on message ewent.
         * Here calling item object "message" function.
         *
         * @param message
         * @param callBack
         */
        public onMessage( message: ISlackbotsMessage, callBack: any ): void
        {
            this.debug("__onMessage");

            let runMessage: any = function ( text: string, params: any, err: any ): void
            {
                callBack(text, params, err);
            };

            for ( let index in this.items )
            {
                if ( this.items.hasOwnProperty(index) )
                {
                    this.debug("__onMessage " + index);

                    if ( typeof this.items[ index ].message !== "undefined" )
                    {
                        if ( this.items[ index ].message(message, runMessage) )
                        {
                            this.debug("__onMessage_match: " + index);
                        }
                        else
                        {
                            this.debug("__onMessage_none: " + index);
                        }
                    }
                }
            }
        }

        /**
         * Loading items mechanism.
         *
         * @param itemsObject
         * @returns {boolean}
         */
        private loadItems( itemsObject: string | any ): boolean
        {
            if ( typeof itemsObject === "string" )
            {
                return this.loadItemsPath(itemsObject);
            }
            else
            {
                return this.loadItemsList(itemsObject);
            }
        }

        /**
         * Loading items from filesystem.
         *
         * @param itemsList
         * @returns {boolean}
         */
        private loadItemsList( itemsList: any ): boolean
        {
            if ( !itemsList )
            {
                return false;
            }

            for ( let index in itemsList )
            {
                if ( itemsList.hasOwnProperty(index) )
                {
                    let itemSource: IEasySlackBotItemObject = itemsList[ index ];

                    if ( typeof itemsList[ index ] === "function" )
                    {
                        this.items[ index ] = new itemSource(this.getBot());
                    }
                }
            }

            return true;
        }

        /**
         * Loading items from manual declared list.
         *
         * @param itemsPath
         * @returns {boolean}
         */
        private loadItemsPath( itemsPath: string ): boolean
        {
            let itemsFiles: any = fs.readdirSync(itemsPath);

            if ( !itemsFiles )
            {
                return false;
            }

            for ( let index in itemsFiles )
            {
                if ( itemsFiles.hasOwnProperty(index) )
                {
                    let itemSource: IEasySlackBotItemObject = require(itemsPath + "/" + itemsFiles[ index ]);

                    if ( typeof itemSource === "function" )
                    {
                        this.items[ itemsFiles[ index ].split(".")[ 0 ] ] = new itemSource(this.getBot());
                    }
                }
            }

            return true;
        }
    }
}
