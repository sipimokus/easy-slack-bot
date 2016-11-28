/// <reference path="./../source.d.ts" />

/**
 * easy-slack-bot namespace.
 */
namespace EasySlackBot
{
    /**
     * Helpers class.
     */
    export class Helpers
    {
        private debug: debug.IDebug = require("debug")("SlackBot.Helpers");
        private natural: any = require("parse-latin")();
        private latinize: LatinizeModule.Latinize = require("latinize");

        /**
         *
         */
        public constructor()
        {
            this.debug("__constructor");
        }

        /**
         *
         * @param a
         * @param b
         * @returns {Array}
         */
        public intersectionOfArrays( a: any, b: any ): any
        {
            let c: any = [];
            let j: number = 0;

            for ( let i: number = 0; i < a.length; ++i )
            {
                if ( b.indexOf(a[ i ]) !== -1 )
                {
                    c[ j++ ] = a[ i ];
                }
            }

            return c;
        }

        /**
         *
         * @param source
         * @returns {string}
         */
        public changeAccentedChars( source: string ): string
        {
            return this.latinize(source);
        }

        /**
         * Naturalize message text
         *
         * @param text
         * @returns {string[]}
         */
        public naturalizeText( text: string ): string[]
        {
            let resultObject: any = this.natural.tokenize(this.changeAccentedChars(text.toLowerCase()));
            let result: string[] = [];

            for ( let index in resultObject )
            {
                if ( resultObject.hasOwnProperty(index) )
                {
                    let valueObject: any = resultObject[ index ];

                    if ( valueObject.type === "WordNode" )
                    {
                        result.push(valueObject.children[ 0 ].value);
                    }
                }
            }

            return result;
        }
    }
}
