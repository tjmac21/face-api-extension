import { CurrentTabImages } from "./chrome/utils";

export enum Sender {
    React,
    Content
}

export interface ChromeMessage {
    from: Sender,
    message: any
}

export type ToProp = {
    pathname: string;
    state: {
        imgClass: CurrentTabImages;
    };
};