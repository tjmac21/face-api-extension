import React from "react";
import { useHistory } from "react-router-dom";

export const About = () => {
    let {push} = useHistory();
    return (
        <div className="App">
            <header className="App-header">
                <p>About</p>
                <p>This is a proof-of-concept that TF.js and ML can be run from a Chrome Extension.</p>
                <p>If you like what you see consider supporting me by donating to my </p>
                <p><a href="https://www.paypal.com/paypalme/tjmacu">PayPal</a></p>
                <p> or starring this project in </p>
                <p><a href="https://github.com/tjmac21/face-api-extension/tree/master/face-api-extension">Github</a></p>
                <button onClick={() => {
                    push('/')
                }}>Home page
                </button>
            </header>
        </div>
    )
}
