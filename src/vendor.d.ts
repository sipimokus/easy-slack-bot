/// <reference path="../typings/index.d.ts" />

/**
 * "slackbots" package interface
 *
 * https://www.npmjs.com/package/slackbots
 */
interface ISlackbots extends NodeJS.EventEmitter
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
interface ISlackbotsMessage
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
