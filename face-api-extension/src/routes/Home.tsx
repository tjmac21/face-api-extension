import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ChromeMessage, Sender, ToProp } from "../types";
import { getCurrentTabUId, CurrentTabImages, getCurrentTabUrl } from "../chrome/utils";

type Map = {
    [key: string]: string
}

const FACE_PAGE_MAP: Map = {
    "Detect Faces": "/face/face-detect",
    "Get Face Landmarks": "/face/face-landmark-detect",
    "Expression Recognition": "/face/expression-detect",
    "Estimate Age & Gender": "/face/age-gender",
}

export const Home = () => {
    const [url, setUrl] = useState<string>('');
    const [responseFromContent, setResponseFromContent] = useState<string>('');
    const [imgClass, setImgClass] = useState(new CurrentTabImages());

    let { push } = useHistory();

    /**
     * Get current URL
     */
    useEffect(() => {
        getCurrentTabUrl((url: any) => {
            setUrl(url || 'undefined');
            setImgClass(new CurrentTabImages(url));
        })
    }, []);

    const sendTestMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "Hello from React",
        }

        getCurrentTabUId((id: any) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (responseFromContentScript) => {
                    setResponseFromContent(responseFromContentScript);
                });
        });
    };

    const fetchImagesMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "fetch images",
        }

        getCurrentTabUId((id: any) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (responseFromContentScript) => {
                    setResponseFromContent(responseFromContentScript);
                });
        });
    };

    const sendRemoveMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "delete logo",
        }

        getCurrentTabUId((id: any) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (response) => {
                    setResponseFromContent(response);
                });
        });
    };


    return (
        <div className="App">
            <header className="App-header">
                <p>Home</p>
                <p>URL:</p>
                <p>
                    {url}
                </p>
                {/* <button onClick={sendTestMessage}>SEND MESSAGE</button>
                <button onClick={sendRemoveMessage}>Remove logo</button>
                <button onClick={fetchImagesMessage}>Recognize faces</button>
                <button onClick={fetchImagesMessage}>Detect Face Landmarks</button>
                <button onClick={fetchImagesMessage}>Detect Expression</button>
                <button onClick={fetchImagesMessage}>Estimate Age and Gender</button> */}
                <button onClick={() => {
                    push('/about')
                }}>About page
                </button>
                {Object.keys(FACE_PAGE_MAP).map(key => {
                    const toProp = {
                        pathname: FACE_PAGE_MAP[key],
                        state: { imgClass: imgClass }
                    } as ToProp;
                    return <Link key={key} to={toProp} >{key}</Link>
                })}
            </header>
        </div>
    )
}
