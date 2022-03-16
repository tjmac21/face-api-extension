import { ChromeMessage, Sender } from "../types";

const KEYS = {
    FETCH_IMAGE: "fetch images"
}

export const getCurrentTabUrl = (callback: (url: string | undefined) => void): void => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        callback(tabs[0].url);
    });
}

export const getCurrentTabUId = (callback: (url: number | undefined) => void): void => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        callback(tabs[0].id);
    });
}

export class CurrentTabImages {
    private _imageUrls: string[];
    url: string;

    constructor(url:string = "") {
        this._imageUrls = [];
        this.url = url;

        if (url === "") {
            return;
        }

        this.fetch().then(data => {
            this._imageUrls = data as unknown as string[];
        });
    }

    get urls() {
        return this._imageUrls;
    }

    private fetch() {
        return new Promise((resolve, reject) => {
            const message: ChromeMessage = {
                from: Sender.React,
                message: KEYS.FETCH_IMAGE,
            }

            getCurrentTabUId((id: any) => {
                id && chrome.tabs.sendMessage(
                    id,
                    message,
                    (responseFromContentScript) => {
                        resolve(responseFromContentScript.split(","));
                    });
            });
        });
    }
}
