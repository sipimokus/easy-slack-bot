declare namespace NodeJS
{
    interface Env
    {
        SLACK_TOKEN: string;
    }
}

declare interface ISlackbots extends NodeJS.EventEmitter
{
    token: string;
    name: string;

    getChannels(): any;
    getGroups(): any;
    getUsers(): any;
    getChannel( name: string ): any;
    getGroup( name: string ): any;
    getUser( name: string ): any;
    getChannelId( name: string ): any;
    getGroupId( name: string ): any;
    getUserId( name: string ): any;
    getChatId( name: string ): any;
    postMessage( id: string, text: string, params: any ): any;
    updateMessage( channelId: string, timestamp: string, text: string, params: any ): any;
    postTo( name: string, message: string, params?: any, callback?: any ): any;
    postMessageToUser( name: string, message: string, params?: any, callback?: any ): any;
    postMessageToGroup( name: string, message: string, params?: any, callback?: any ): any;
    postMessageToChannel( name: string, message: string, params?: any, callback?: any ): any;
    login(): any;
    connect(): any;
}

/**
 * Slack message object
 *
 * https://api.slack.com/events/message
 */
declare interface ISlackbotsMessage
{
    type: string;
    subtype?: string;
    hidden?: boolean;
    channel: string;
    user: string;
    text: string;
    ts: number;
    deleted_ts?: number;
    event_ts?: number;
    team?: string;
    edited?: any;
    is_starred?: boolean;
    natural?: string[];
    pinned_to?: string[];
    reactions?: any;
}

declare interface IEasySlackBotItemObject
{
    new ( bot: ISlackbots ): any;
    message( message: ISlackbotsMessage, callBack: any ): void;
}

declare interface ImessageOnSlackMessageCallBack
{
    ( message: ISlackbotsMessage ): any;
}

declare interface ImainOnSlackMessageCallBack
{
    ( bot: ISlackbots ): any;
}
