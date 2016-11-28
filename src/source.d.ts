/// <reference path="../typings/index.d.ts" />
/// <reference path="./vendor.d.ts" />
/// <reference path="./core/Filters.ts" />
/// <reference path="./core/Helpers.ts" />
/// <reference path="./core/Items.ts" />
/// <reference path="./core/Message.ts" />
/// <reference path="./core/Slack.ts" />
/// <reference path="./Index.ts" />

declare namespace EasySlackBot
{
    interface IMainSlackOptions
    {
        SLACK_TOKEN : string;
    }

    interface IMainOptions
    {
        Slack : IMainSlackOptions;
    }

    interface IMainOnSlackMessageCallBack
    {
        ( bot: ISlackbots ): any;
    }

    interface IitemsOnMessageCallBack
    {
        ( text: string, params: any, err: any ): any;
    }

    interface IEasySlackBotItemObject
    {
        new ( bot: ISlackbots ): any;
        message( message: ISlackbotsMessage, callBack: any ): void;
    }

    interface ImessageOnSlackMessageCallBack
    {
        ( message: ISlackbotsMessage ): any;
    }


}
